import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IPreferenceClient} from '@/src/services/PreferenceServices/IPreferenceClient';
import {RemoveLikedArtistCommand} from '@/src/services/PreferenceServices/PreferenceCommands';

export class RemoveLikedArtistCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IPreferenceClient,
        private readonly repository: IRepository<UserPreferencesData>,
    ) {
        super();
    }

    async handle(command: RemoveLikedArtistCommand): Promise<void> {
        await this.timed('RemoveLikedArtist', async () => {
            await this.client.removeLikedArtist(command);
            const updated = await this.client.getPreferences(command.token);
            await this.repository.update(updated);
        });
    }
}
