export interface IRepository<T> {
    get(): Promise<T | null>;
    update(data: T | null): Promise<void>;
    subscribe(listener: () => void): () => void;
}
