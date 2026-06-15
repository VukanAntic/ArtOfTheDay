export interface IRepository<T> {
    get(): Promise<T | null>;
    update(data: T): Promise<void>;
    subscribe(listener: () => void): () => void;
}
