import {CURRENT_PROTOCOL} from '@/src/config/apiProtocol';

export abstract class CommandHandler {
    protected async timed<T>(name: string, fn: () => Promise<T>): Promise<T> {
        const start = Date.now();
        const result = await fn();
        console.log(`[${CURRENT_PROTOCOL}] ${name}: ${Date.now() - start}ms`);
        return result;
    }
}
