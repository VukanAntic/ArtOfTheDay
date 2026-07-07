import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IPreferenceClient} from '@/src/services/PreferenceServices/IPreferenceClient';
import {AddLikedArtworkCommand} from '@/src/services/PreferenceServices/PreferenceCommands';

export class AddLikedArtworkCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IPreferenceClient,
        private readonly repository: IRepository<UserPreferencesData>,
    ) {
        super();
    }

    async handle(command: AddLikedArtworkCommand): Promise<void> {
        await this.timed('AddLikedArtwork', async () => {
            await this.client.addLikedArtwork(command);
            const updated = await this.client.getPreferences();
            await this.repository.update(updated);
        });
    }
}
