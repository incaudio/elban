import { type InsertSubscriber, type Subscriber } from "@shared/schema";

export interface IStorage {
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
}

// If a real DATABASE_URL is present, load the real DB-backed storage.
let storageImpl: IStorage;

if (process.env.DATABASE_URL) {
  const { db } = await import("./db");
  const { subscribers } = await import("@shared/schema");
  const { eq } = await import("drizzle-orm");

  class DatabaseStorage implements IStorage {
    async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
      const [subscriber] = await db.insert(subscribers).values(insertSubscriber).returning();
      return subscriber;
    }

    async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
      const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.email, email));
      return subscriber;
    }
  }

  storageImpl = new DatabaseStorage();
} else {
  const store: Array<Subscriber & { id: number }> = [];
  let idCounter = 1;

  class InMemoryStorage implements IStorage {
    async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
      const subscriber = {
        id: idCounter++,
        email: insertSubscriber.email,
        createdAt: new Date(),
      } as unknown as Subscriber;
      store.push(subscriber as any);
      return subscriber;
    }

    async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
      return store.find((s) => s.email === email);
    }
  }

  storageImpl = new InMemoryStorage();
}

export const storage: IStorage = storageImpl;
