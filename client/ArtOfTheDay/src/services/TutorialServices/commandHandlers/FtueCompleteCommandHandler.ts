import {CommandHandler} from '@/src/services/CommandHandler';
import {ITutorialClient} from '@/src/services/TutorialServices/ITutorialClient';
import {FtueCompleteCommand} from '@/src/services/TutorialServices/TutorialCommands';

export class FtueCompleteCommandHandler extends CommandHandler {
    constructor(private readonly client: ITutorialClient) {
        super();
    }

    async handle(command: FtueCompleteCommand): Promise<void> {
        await this.timed('FtueComplete', () => this.client.ftueComplete(command));
    }
}
