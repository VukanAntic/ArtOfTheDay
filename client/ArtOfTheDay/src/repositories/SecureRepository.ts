import * as SecureStore from 'expo-secure-store';
import {IRepository} from './IRepository';

export class SecureRepository<T> implements IRepository<T> {
    private listeners: Set<() => void> = new Set();

    constructor(private readonly key: string) {}

    async get(): Promise<T | null> {
        const raw = await SecureStore.getItemAsync(this.key);
        if (!raw) return null;
        return JSON.parse(raw) as T;
    }

    async update(data: T): Promise<void> {
        await SecureStore.setItemAsync(this.key, JSON.stringify(data));
        this.listeners.forEach(l => l());
    }

    subscribe(listener: () => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
}
