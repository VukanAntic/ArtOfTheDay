import {SeenImageData} from '@/src/domain/SeenImageData';

export interface INextImageClient {
    getHistory(): Promise<SeenImageData[]>;
}
