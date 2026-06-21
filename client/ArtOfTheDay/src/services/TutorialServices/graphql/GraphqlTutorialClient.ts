import {ITutorialClient} from '@/src/services/TutorialServices/ITutorialClient';
import {FtueCompleteCommand} from '@/src/services/TutorialServices/TutorialCommands';

export class GraphqlTutorialClient implements ITutorialClient {
    ftueComplete(_command: FtueCompleteCommand): Promise<void> {
        throw new Error('GraphQL not yet implemented');
    }
}
