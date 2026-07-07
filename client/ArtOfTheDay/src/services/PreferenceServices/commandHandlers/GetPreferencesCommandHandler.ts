import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IPreferenceClient} from '@/src/services/PreferenceServices/IPreferenceClient';
import {GetPreferencesCommand} from '@/src/services/PreferenceServices/PreferenceCommands';

export class GetPreferencesCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IPreferenceClient,
        private readonly repository: IRepository<UserPreferencesData>,
    ) {
        super();
    }

    async handle(_command: GetPreferencesCommand): Promise<void> {
        await this.timed('GetPreferences', async () => {
            const preferences = await this.client.getPreferences();
            await this.repository.update(preferences);
        });
    }
}
