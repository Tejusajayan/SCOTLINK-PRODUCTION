import { pgTable, text, varchar, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // 'admin' or 'user'
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const services = pgTable("services", {
  id: varchar("id", { length: 36 }).primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  importance: text("importance").notNull(),
  imageUrl: text("image_url").notNull(),
  workflowSteps: text("workflow_steps").notNull(), // JSON array of {title, description}
  galleryImages: text("gallery_images").notNull(), // JSON array of URLs
  features: text("features").notNull().default("[]"), // JSON array of feature strings
  enabled: boolean("enabled").notNull().default(true),
  order: integer("order").notNull().default(0),
});

export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export const galleryImages = pgTable("gallery_images", {
  id: varchar("id", { length: 36 }).primaryKey(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  category: text("category").notNull(),
  order: integer("order").notNull().default(0),
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({ id: true });
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type GalleryImage = typeof galleryImages.$inferSelect;

export const clientLogos = pgTable("client_logos", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull().default(0),
});

export const insertClientLogoSchema = createInsertSchema(clientLogos).omit({ id: true });
export type InsertClientLogo = z.infer<typeof insertClientLogoSchema>;
export type ClientLogo = typeof clientLogos.$inferSelect;

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true });
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .email("Please enter a valid email")
    .max(255, "Email must not exceed 255 characters"),
  phone: z.string()
    .min(8, "Please enter a valid phone number")
    .max(20, "Phone number must not exceed 20 characters")
    .regex(/^[0-9+\s()-]+$/, "Phone number can only contain numbers, +, -, (, ), and spaces"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters")
    .refine((val) => !/<script|javascript:|on\w+=/i.test(val), {
      message: "Message contains invalid content"
    }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
