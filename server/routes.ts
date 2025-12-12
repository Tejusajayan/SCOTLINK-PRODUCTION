import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, authMiddleware, type AuthRequest } from "./auth";
import { contactFormSchema, insertGalleryImageSchema, insertClientLogoSchema, insertServiceSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services.filter(s => s.enabled));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:slug", async (req, res) => {
    try {
      const service = await storage.getServiceBySlug(req.params.slug);
      if (!service || !service.enabled) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery" });
    }
  });

  app.get("/api/client-logos", async (req, res) => {
    try {
      const logos = await storage.getClientLogos();
      res.json(logos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch logos" });
    }
  });

  // Rate limiting for contact form (simple in-memory store)
  const contactSubmissions = new Map<string, number[]>();

  // Helper function to sanitize input
  function sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove < and >
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
      .trim();
  }

  app.post("/api/contact", async (req, res) => {
    try {
      // Rate limiting: max 5 submissions per hour per IP
      const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
      const now = Date.now();
      const hourAgo = now - 3600000; // 1 hour in milliseconds

      if (!contactSubmissions.has(clientIp)) {
        contactSubmissions.set(clientIp, []);
      }

      const ipSubmissions = contactSubmissions.get(clientIp)!;
      // Remove submissions older than 1 hour
      const recentSubmissions = ipSubmissions.filter(time => time > hourAgo);
      contactSubmissions.set(clientIp, recentSubmissions);

      if (recentSubmissions.length >= 5) {
        return res.status(429).json({
          error: "Too many submissions. Please try again later."
        });
      }

      // Validate with schema
      const data = contactFormSchema.parse(req.body);

      // Additional server-side sanitization
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email),
        phone: sanitizeInput(data.phone),
        message: sanitizeInput(data.message),
      };

      // Store submission with sanitized data
      const submission = await storage.createContactSubmission(sanitizedData);

      // Record this submission
      recentSubmissions.push(now);
      contactSubmissions.set(clientIp, recentSubmissions);

      const timestamp = new Date().toISOString();
      console.log("New contact submission:", {
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        message: sanitizedData.message,
        timestamp,
      });

      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            subject: `New Contact Form Submission from ${sanitizedData.name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${sanitizedData.name}</p>
              <p><strong>Email:</strong> ${sanitizedData.email}</p>
              <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
              <p><strong>Message:</strong></p>
              <p>${sanitizedData.message.replace(/\n/g, "<br>")}</p>
              <hr>
              <p><small>Received at: ${timestamp}</small></p>
            `,
          });
          console.log("Contact email sent successfully");
        } catch (emailError) {
          console.error("Failed to send email notification:", emailError);
        }
      }

      res.status(201).json({ success: true, id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid form data", details: error.errors });
      }
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to submit form" });
    }
  });

  app.get("/api/user", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Don't send password to client
      const { password, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.get("/api/admin/services", authMiddleware, async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.post("/api/admin/services", authMiddleware, async (req, res) => {
    try {
      const data = insertServiceSchema.parse(req.body);
      const service = await storage.createService(data);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create service" });
    }
  });

  app.patch("/api/admin/services/:id", authMiddleware, async (req, res) => {
    try {
      const partialSchema = insertServiceSchema.partial();
      const data = partialSchema.parse(req.body);
      const service = await storage.updateService(req.params.id, data);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update service" });
    }
  });

  app.delete("/api/admin/services/:id", authMiddleware, async (req, res) => {
    try {
      const success = await storage.deleteService(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete service" });
    }
  });

  app.get("/api/admin/gallery", authMiddleware, async (req, res) => {
    try {
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery" });
    }
  });

  app.post("/api/admin/gallery", authMiddleware, async (req, res) => {
    try {
      const data = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(data);
      res.status(201).json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create image" });
    }
  });

  app.delete("/api/admin/gallery/:id", authMiddleware, async (req, res) => {
    try {
      const success = await storage.deleteGalleryImage(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete image" });
    }
  });

  app.get("/api/admin/client-logos", authMiddleware, async (req, res) => {
    try {
      const logos = await storage.getClientLogos();
      res.json(logos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch logos" });
    }
  });

  app.post("/api/admin/client-logos", authMiddleware, async (req, res) => {
    try {
      const data = insertClientLogoSchema.parse(req.body);
      const logo = await storage.createClientLogo(data);
      res.status(201).json(logo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create logo" });
    }
  });

  app.patch("/api/admin/client-logos/:id", authMiddleware, async (req, res) => {
    try {
      const partialSchema = insertClientLogoSchema.partial();
      const data = partialSchema.parse(req.body);
      const logo = await storage.updateClientLogo(req.params.id, data);
      if (!logo) {
        return res.status(404).json({ error: "Logo not found" });
      }
      res.json(logo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update logo" });
    }
  });

  app.delete("/api/admin/client-logos/:id", authMiddleware, async (req, res) => {
    try {
      const success = await storage.deleteClientLogo(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Logo not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete logo" });
    }
  });

  app.get("/api/admin/contact-submissions", authMiddleware, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  app.delete("/api/admin/contact-submissions/:id", authMiddleware, async (req, res) => {
    try {
      const success = await storage.deleteContactSubmission(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Submission not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete submission" });
    }
  });

  app.get("/api/admin/contact-submissions/export/csv", authMiddleware, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      const headers = ["Name", "Email", "Phone", "Message", "Date"];
      const rows = submissions.map((s) => [
        s.name.replace(/,/g, ";"),
        s.email,
        s.phone,
        s.message.replace(/,/g, ";").replace(/\n/g, " "),
        new Date(s.createdAt).toLocaleString(),
      ]);
      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=contact_submissions.csv");
      res.send(csv);
    } catch (error) {
      res.status(500).json({ error: "Failed to export CSV" });
    }
  });

  // Admin User Management Routes
  app.get("/api/admin/users", authMiddleware, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      // Don't send passwords to client
      const safeUsers = users.map(({ password, ...user }) => user);
      res.json(safeUsers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.post("/api/admin/users", authMiddleware, async (req, res) => {
    try {
      const { username, password, role } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      if (role && role !== "admin" && role !== "user") {
        return res.status(400).json({ error: "Invalid role. Must be 'admin' or 'user'" });
      }

      // Check if username already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }

      // Hash password
      const { scrypt, randomBytes } = await import("crypto");
      const { promisify } = await import("util");
      const scryptAsync = promisify(scrypt);

      const salt = randomBytes(16).toString("hex");
      const buf = (await scryptAsync(password, salt, 64)) as Buffer;
      const hashedPassword = `${buf.toString("hex")}.${salt}`;

      const user = await storage.createUser({
        username,
        password: hashedPassword,
        role: role || "user",
      });

      // Don't send password to client
      const { password: _, ...safeUser } = user;
      res.status(201).json(safeUser);
    } catch (error) {
      console.error("Failed to create user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.put("/api/admin/users/:id/password", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;

      if (!newPassword) {
        return res.status(400).json({ error: "New password is required" });
      }

      // Get the user
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if user is changing their own password or is an admin
      const requestingUser = await storage.getUser(req.userId!);
      const isSelf = req.userId === id;
      const isAdmin = requestingUser?.role === "admin";

      if (!isSelf && !isAdmin) {
        return res.status(403).json({ error: "Unauthorized to change this password" });
      }

      // If changing own password, verify current password
      if (isSelf && currentPassword) {
        const { scrypt } = await import("crypto");
        const { promisify } = await import("util");
        const scryptAsync = promisify(scrypt);

        const [hashedPassword, salt] = user.password.split(".");
        const buf = (await scryptAsync(currentPassword, salt, 64)) as Buffer;
        const suppliedHash = buf.toString("hex");

        if (suppliedHash !== hashedPassword) {
          return res.status(401).json({ error: "Current password is incorrect" });
        }
      }

      // Hash new password
      const { scrypt, randomBytes } = await import("crypto");
      const { promisify } = await import("util");
      const scryptAsync = promisify(scrypt);

      const salt = randomBytes(16).toString("hex");
      const buf = (await scryptAsync(newPassword, salt, 64)) as Buffer;
      const hashedPassword = `${buf.toString("hex")}.${salt}`;

      const updatedUser = await storage.updateUserPassword(id, hashedPassword);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      console.error("Failed to update password:", error);
      res.status(500).json({ error: "Failed to update password" });
    }
  });


  app.get("/sitemap.xml", async (req, res) => {
    const baseUrl = `https://${req.headers.host}`;
    const pages = [
      { url: "/", priority: "1.0" },
      { url: "/about", priority: "0.8" },
      { url: "/services", priority: "0.9" },
      { url: "/gallery", priority: "0.6" },
      { url: "/why-choose-us", priority: "0.7" },
      { url: "/contact", priority: "0.8" },
    ];

    try {
      const services = await storage.getServices();
      services.filter(s => s.enabled).forEach(service => {
        pages.push({ url: `/services/${service.slug}`, priority: "0.7" });
      });
    } catch (error) {
      pages.push({ url: "/services/automobile-lashing", priority: "0.7" });
      pages.push({ url: "/services/heavy-equipment-lashing", priority: "0.7" });
      pages.push({ url: "/services/wooden-packing", priority: "0.7" });
      pages.push({ url: "/services/palletization", priority: "0.7" });
      pages.push({ url: "/services/bundling-service", priority: "0.7" });
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  });

  app.get("/robots.txt", (req, res) => {
    const baseUrl = `https://${req.headers.host}`;
    const robots = `User-agent: *
Allow: /
Disallow: /vscolog
Disallow: /vscolog/dashboard

Sitemap: ${baseUrl}/sitemap.xml`;

    res.header("Content-Type", "text/plain");
    res.send(robots);
  });

  return httpServer;
}
