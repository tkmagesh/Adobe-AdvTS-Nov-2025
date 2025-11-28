
import { Event } from "./types";

/**
 * Minimal in-memory event store for demo/testing.
 * Not meant for production.
 */
export class InMemoryEventStore {
    private store: Record<string, Event[]> = {};

    appendEvents(aggregateId: string, events: Event[]) {
        this.store[aggregateId] = [...(this.store[aggregateId] ?? []), ...events];
    }

    readEvents(aggregateId: string): Event[] {
        return [...(this.store[aggregateId] ?? [])];
    }

    clear() {
        this.store = {};
    }
}
