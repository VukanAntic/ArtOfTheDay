import {ITutorialClient} from '@/src/services/TutorialServices/ITutorialClient';
import {FtueCompleteCommand} from '@/src/services/TutorialServices/TutorialCommands';
import {API_CONFIG} from '@/src/config/apiConfig';
import {restPost} from '@/src/services/rest/restFetch';

const BASE = `${API_CONFIG.identityService}/api/tutorial`;

export class RestTutorialClient implements ITutorialClient {
    async ftueComplete(_command: FtueCompleteCommand): Promise<void> {
        await restPost<void, void>(`${BASE}/ftue-complete`, undefined);
    }
}
