import {SeenImageData} from '@/src/domain/SeenImageData';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';

export class GrpcNextImageClient implements INextImageClient {
    getHistory(_token: string): Promise<SeenImageData[]> {
        throw new Error('gRPC not yet implemented');
    }
}
