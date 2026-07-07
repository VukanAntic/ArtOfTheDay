import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IPreferenceClient} from '@/src/services/PreferenceServices/IPreferenceClient';
import {RemoveLikedGenreCommand} from '@/src/services/PreferenceServices/PreferenceCommands';

export class RemoveLikedGenreCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IPreferenceClient,
        private readonly repository: IRepository<UserPreferencesData>,
    ) {
        super();
    }

    async handle(command: RemoveLikedGenreCommand): Promise<void> {
        await this.timed('RemoveLikedGenre', async () => {
            await this.client.removeLikedGenre(command);
            const updated = await this.client.getPreferences();
            await this.repository.update(updated);
        });
    }
}
