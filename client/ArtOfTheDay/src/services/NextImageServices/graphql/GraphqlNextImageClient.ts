import {SeenImageData} from '@/src/domain/SeenImageData';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';
import {SetPreferredTimeCommand} from '@/src/services/NextImageServices/NextImageCommands';

export class GraphqlNextImageClient implements INextImageClient {
    getHistory(): Promise<SeenImageData[]> {
        throw new Error('GraphQL not yet implemented');
    }

    setPreferredTime(_command: SetPreferredTimeCommand): Promise<void> {
        throw new Error('GraphQL not yet implemented');
    }
}
