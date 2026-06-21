import {ITutorialClient} from '@/src/services/TutorialServices/ITutorialClient';
import {FtueCompleteCommand} from '@/src/services/TutorialServices/TutorialCommands';

export class GrpcTutorialClient implements ITutorialClient {
    ftueComplete(_command: FtueCompleteCommand): Promise<void> {
        throw new Error('gRPC not yet implemented');
    }
}
