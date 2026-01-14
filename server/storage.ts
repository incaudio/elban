import { type InsertSubscriber, type Subscriber } from "@shared/schema";

export interface IStorage {
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
}

class LazyStorage implements IStorage {
  private impl?: IStorage;
  private initializing?: Promise<void>;

  private async init() {
    if (this.impl) return;
    if (this.initializing) return this.initializing;

    this.initializing = (async () => {
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

        this.impl = new DatabaseStorage();
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

        this.impl = new InMemoryStorage();
      }
    })();

    return this.initializing;
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    await this.init();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.impl!.createSubscriber(insertSubscriber);
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    await this.init();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.impl!.getSubscriberByEmail(email);
  }
}

export const storage: IStorage = new LazyStorage();
