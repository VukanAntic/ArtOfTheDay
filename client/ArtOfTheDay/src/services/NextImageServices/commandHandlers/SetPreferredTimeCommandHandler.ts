import {CommandHandler} from '@/src/services/CommandHandler';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';
import {SetPreferredTimeCommand} from '@/src/services/NextImageServices/NextImageCommands';

export class SetPreferredTimeCommandHandler extends CommandHandler {
    constructor(private readonly client: INextImageClient) {
        super();
    }

    async handle(command: SetPreferredTimeCommand): Promise<void> {
        await this.timed('SetPreferredTime', () => this.client.setPreferredTime(command));
    }
}
