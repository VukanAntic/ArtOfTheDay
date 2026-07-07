import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IPreferenceClient} from '@/src/services/PreferenceServices/IPreferenceClient';
import {AddDislikedArtworkCommand} from '@/src/services/PreferenceServices/PreferenceCommands';

export class AddDislikedArtworkCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IPreferenceClient,
        private readonly repository: IRepository<UserPreferencesData>,
    ) {
        super();
    }

    async handle(command: AddDislikedArtworkCommand): Promise<void> {
        await this.timed('AddDislikedArtwork', async () => {
            await this.client.addDislikedArtwork(command);
            const updated = await this.client.getPreferences();
            await this.repository.update(updated);
        });
    }
}
