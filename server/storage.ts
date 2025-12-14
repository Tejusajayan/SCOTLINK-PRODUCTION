import {
  type User,
  type InsertUser,
  type Service,
  type InsertService,
  type GalleryImage,
  type InsertGalleryImage,
  type ClientLogo,
  type InsertClientLogo,
  clientLogos,
  users,
  services,
  galleryImages
} from "@shared/schema";
import { randomUUID } from "crypto";
import session from "express-session";
import createMemoryStore from "memorystore";
import { db } from "./db";
import { eq } from "drizzle-orm";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserPassword(id: string, hashedPassword: string): Promise<User | undefined>;

  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;

  getGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImage(id: string): Promise<GalleryImage | undefined>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: string, updates: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined>;
  deleteGalleryImage(id: string): Promise<boolean>;

  getClientLogos(): Promise<ClientLogo[]>;
  getClientLogo(id: string): Promise<ClientLogo | undefined>;
  createClientLogo(logo: InsertClientLogo): Promise<ClientLogo>;
  updateClientLogo(id: string, logo: Partial<InsertClientLogo>): Promise<ClientLogo | undefined>;
  deleteClientLogo(id: string): Promise<boolean>;

  sessionStore: session.Store;
}

export class PgStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    // Use MemoryStore for sessions - can be upgraded to connect-pg-simple later
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    this.initializeDefaultAdmin();
  }

  private async initializeDefaultAdmin() {
    try {
      const { scrypt, randomBytes } = await import("crypto");
      const { promisify } = await import("util");
      const scryptAsync = promisify(scrypt);

      // Check if any admin user exists
      const existingAdmins = await db.select()
        .from(users)
        .where(eq(users.role, "admin"))
        .limit(1);

      if (existingAdmins.length === 0) {
        // Create default admin user
        const salt = randomBytes(16).toString("hex");
        const buf = (await scryptAsync("admin123", salt, 64)) as Buffer;
        const hashedPassword = `${buf.toString("hex")}.${salt}`;

        await db.insert(users).values({
          id: randomUUID(),
          username: "admin",
          password: hashedPassword,
          role: "admin",
        });

        console.log("Default admin user created (username: admin, password: admin123)");
      }
    } catch (error) {
      console.error("Error initializing default admin:", error);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser & { role?: string }): Promise<User> {
    const id = randomUUID();
    const user = { ...insertUser, id, role: insertUser.role || "user" };
    await db.insert(users).values(user);
    return user as User;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async updateUserPassword(id: string, hashedPassword: string): Promise<User | undefined> {
    const result = await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(services.order);
  }

  async getService(id: string): Promise<Service | undefined> {
    const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
    return result[0];
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const result = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
    return result[0];
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service = { ...insertService, id };
    await db.insert(services).values(service);
    return service as Service;
  }

  async updateService(id: string, updates: Partial<InsertService>): Promise<Service | undefined> {
    const result = await db.update(services)
      .set(updates)
      .where(eq(services.id, id))
      .returning();
    return result[0];
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id)).returning();
    return result.length > 0;
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages).orderBy(galleryImages.order);
  }

  async getGalleryImage(id: string): Promise<GalleryImage | undefined> {
    const result = await db.select().from(galleryImages).where(eq(galleryImages.id, id)).limit(1);
    return result[0];
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = randomUUID();
    const image = { ...insertImage, id };
    await db.insert(galleryImages).values(image);
    return image as GalleryImage;
  }

  async updateGalleryImage(id: string, updates: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined> {
    const result = await db.update(galleryImages)
      .set(updates)
      .where(eq(galleryImages.id, id))
      .returning();
    return result[0];
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    const result = await db.delete(galleryImages).where(eq(galleryImages.id, id)).returning();
    return result.length > 0;
  }

  async getClientLogos(): Promise<ClientLogo[]> {
    return await db.select().from(clientLogos).orderBy(clientLogos.order);
  }

  async getClientLogo(id: string): Promise<ClientLogo | undefined> {
    const result = await db.select().from(clientLogos).where(eq(clientLogos.id, id)).limit(1);
    return result[0];
  }

  async createClientLogo(insertLogo: InsertClientLogo): Promise<ClientLogo> {
    const id = randomUUID();
    const logo = { ...insertLogo, id };
    await db.insert(clientLogos).values(logo);
    return logo as ClientLogo;
  }

  async updateClientLogo(id: string, updates: Partial<InsertClientLogo>): Promise<ClientLogo | undefined> {
    const result = await db.update(clientLogos)
      .set(updates)
      .where(eq(clientLogos.id, id))
      .returning();
    return result[0];
  }

  async deleteClientLogo(id: string): Promise<boolean> {
    const result = await db.delete(clientLogos).where(eq(clientLogos.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new PgStorage();
