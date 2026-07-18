import {IRepository} from './IRepository';

export class InMemoryRepository<T> implements IRepository<T> {
    private data: T | null = null;
    private listeners: Set<() => void> = new Set();

    async get(): Promise<T | null> {
        return this.data;
    }

    async update(data: T | null): Promise<void> {
        this.data = data;
        this.listeners.forEach(l => l());
    }

    subscribe(listener: () => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
}
