import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IPreferenceClient} from '@/src/services/PreferenceServices/IPreferenceClient';
import {RemoveLikedArtworkCommand} from '@/src/services/PreferenceServices/PreferenceCommands';

export class RemoveLikedArtworkCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IPreferenceClient,
        private readonly repository: IRepository<UserPreferencesData>,
    ) {
        super();
    }

    async handle(command: RemoveLikedArtworkCommand): Promise<void> {
        await this.timed('RemoveLikedArtwork', async () => {
            await this.client.removeLikedArtwork(command);
            const updated = await this.client.getPreferences(command.token);
            await this.repository.update(updated);
        });
    }
}
