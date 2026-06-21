import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IPreferenceClient} from '@/src/services/PreferenceServices/IPreferenceClient';
import {AddLikedArtistCommand} from '@/src/services/PreferenceServices/PreferenceCommands';

export class AddLikedArtistCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IPreferenceClient,
        private readonly repository: IRepository<UserPreferencesData>,
    ) {
        super();
    }

    async handle(command: AddLikedArtistCommand): Promise<void> {
        await this.timed('AddLikedArtist', async () => {
            await this.client.addLikedArtist(command);
            const updated = await this.client.getPreferences(command.token);
            await this.repository.update(updated);
        });
    }
}
