import {SeenImageData} from '@/src/domain/SeenImageData';

export interface INextImageClient {
    getHistory(token: string): Promise<SeenImageData[]>;
}
