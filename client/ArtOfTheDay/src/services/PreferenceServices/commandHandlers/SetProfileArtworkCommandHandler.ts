import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IPreferenceClient} from '@/src/services/PreferenceServices/IPreferenceClient';
import {SetProfileArtworkCommand} from '@/src/services/PreferenceServices/PreferenceCommands';

export class SetProfileArtworkCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IPreferenceClient,
        private readonly repository: IRepository<UserPreferencesData>,
    ) {
        super();
    }

    async handle(command: SetProfileArtworkCommand): Promise<void> {
        await this.timed('SetProfileArtwork', async () => {
            await this.client.setProfileArtwork(command);
            const updated = await this.client.getPreferences();
            await this.repository.update(updated);
        });
    }
}
