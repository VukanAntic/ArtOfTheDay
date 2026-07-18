import {IRepository} from './IRepository';

export class CachedRepository<T> implements IRepository<T> {
    private cache: T | null = null;
    private listeners: Set<() => void> = new Set();

    constructor(private readonly inner: IRepository<T>) {}

    async get(): Promise<T | null> {
        if (this.cache !== null) return this.cache;
        this.cache = await this.inner.get();
        return this.cache;
    }

    async update(data: T | null): Promise<void> {
        this.cache = data;
        await this.inner.update(data);
        this.listeners.forEach(l => l());
    }

    subscribe(listener: () => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
}
