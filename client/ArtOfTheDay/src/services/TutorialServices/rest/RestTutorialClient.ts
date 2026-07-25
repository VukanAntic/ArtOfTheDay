import {ITutorialClient} from '@/src/services/TutorialServices/ITutorialClient';
import {FtueCompleteCommand} from '@/src/services/TutorialServices/TutorialCommands';
import {API_CONFIG} from '@/src/config/apiConfig';
import {restPost} from '@/src/services/rest/restFetch';

const BASE = `${API_CONFIG.identityService}/api/tutorial`;

export class RestTutorialClient implements ITutorialClient {
    async ftueComplete(command: FtueCompleteCommand): Promise<void> {
        await restPost<FtueCompleteCommand, void>(`${BASE}/ftue-complete`, {
            artworkIds: command.artworkIds,
            genreIds: command.genreIds,
            artistIds: command.artistIds,
        });
    }
}
