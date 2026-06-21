import {SeenImageData} from '@/src/domain/SeenImageData';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';

export class GraphqlNextImageClient implements INextImageClient {
    getHistory(_token: string): Promise<SeenImageData[]> {
        throw new Error('GraphQL not yet implemented');
    }
}
