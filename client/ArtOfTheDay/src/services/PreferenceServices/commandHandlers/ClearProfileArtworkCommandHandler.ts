import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IPreferenceClient} from '@/src/services/PreferenceServices/IPreferenceClient';
import {ClearProfileArtworkCommand} from '@/src/services/PreferenceServices/PreferenceCommands';

export class ClearProfileArtworkCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IPreferenceClient,
        private readonly repository: IRepository<UserPreferencesData>,
    ) {
        super();
    }

    async handle(command: ClearProfileArtworkCommand): Promise<void> {
        await this.timed('ClearProfileArtwork', async () => {
            await this.client.clearProfileArtwork(command);
            const updated = await this.client.getPreferences();
            await this.repository.update(updated);
        });
    }
}
