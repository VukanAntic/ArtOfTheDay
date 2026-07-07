import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IPreferenceClient} from '@/src/services/PreferenceServices/IPreferenceClient';
import {RemoveDislikedArtworkCommand} from '@/src/services/PreferenceServices/PreferenceCommands';

export class RemoveDislikedArtworkCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IPreferenceClient,
        private readonly repository: IRepository<UserPreferencesData>,
    ) {
        super();
    }

    async handle(command: RemoveDislikedArtworkCommand): Promise<void> {
        await this.timed('RemoveDislikedArtwork', async () => {
            await this.client.removeDislikedArtwork(command);
            const updated = await this.client.getPreferences();
            await this.repository.update(updated);
        });
    }
}
