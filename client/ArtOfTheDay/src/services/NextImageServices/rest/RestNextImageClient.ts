import {SeenImageData} from '@/src/domain/SeenImageData';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';
import {SetPreferredTimeCommand} from '@/src/services/NextImageServices/NextImageCommands';
import {API_CONFIG} from '@/src/config/apiConfig';
import {restGet, restPost} from '@/src/services/rest/restFetch';

type SeenImageDTO = {
    artworkId: number;
    seenAt: number;
};

const BASE = `${API_CONFIG.nextImageService}/api/next-image`;

export class RestNextImageClient implements INextImageClient {
    async getHistory(): Promise<SeenImageData[]> {
        const res = await restGet<SeenImageDTO[]>(`${BASE}/history`);
        return res.map(dto => new SeenImageData(dto.artworkId, new Date(dto.seenAt)));
    }

    async setPreferredTime(command: SetPreferredTimeCommand): Promise<void> {
        await restPost<SetPreferredTimeCommand, void>(
            `${BASE}/set-preferred-time-for-update`,
            {
                preferredTimeInHours: command.preferredTimeInHours,
                preferredTimeInMinutes: command.preferredTimeInMinutes,
                timeZoneId: command.timeZoneId,
            },
        );
    }
}
