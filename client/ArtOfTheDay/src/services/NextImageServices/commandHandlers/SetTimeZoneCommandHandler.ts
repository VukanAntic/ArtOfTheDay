import {CommandHandler} from '@/src/services/CommandHandler';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';
import {SetTimeZoneCommand} from '@/src/services/NextImageServices/NextImageCommands';

export class SetTimeZoneCommandHandler extends CommandHandler {
    constructor(private readonly client: INextImageClient) {
        super();
    }

    async handle(command: SetTimeZoneCommand): Promise<void> {
        await this.timed('SetTimeZone', async () => {
            await this.client.setTimeZone(command);
        });
    }
}
