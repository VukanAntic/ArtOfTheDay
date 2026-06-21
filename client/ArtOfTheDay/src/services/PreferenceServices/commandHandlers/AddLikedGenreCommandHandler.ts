import {IRepository} from '@/src/repositories/IRepository';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {CommandHandler} from '@/src/services/CommandHandler';
import {IPreferenceClient} from '@/src/services/PreferenceServices/IPreferenceClient';
import {AddLikedGenreCommand} from '@/src/services/PreferenceServices/PreferenceCommands';

export class AddLikedGenreCommandHandler extends CommandHandler {
    constructor(
        private readonly client: IPreferenceClient,
        private readonly repository: IRepository<UserPreferencesData>,
    ) {
        super();
    }

    async handle(command: AddLikedGenreCommand): Promise<void> {
        await this.timed('AddLikedGenre', async () => {
            await this.client.addLikedGenre(command);
            const updated = await this.client.getPreferences(command.token);
            await this.repository.update(updated);
        });
    }
}
