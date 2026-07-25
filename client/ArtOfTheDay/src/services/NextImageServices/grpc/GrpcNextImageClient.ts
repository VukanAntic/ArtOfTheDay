import {SeenImageData} from '@/src/domain/SeenImageData';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';
import {SetPreferredTimeCommand} from '@/src/services/NextImageServices/NextImageCommands';

export class GrpcNextImageClient implements INextImageClient {
    getHistory(): Promise<SeenImageData[]> {
        throw new Error('gRPC not yet implemented');
    }

    setPreferredTime(_command: SetPreferredTimeCommand): Promise<void> {
        throw new Error('gRPC not yet implemented');
    }
}
