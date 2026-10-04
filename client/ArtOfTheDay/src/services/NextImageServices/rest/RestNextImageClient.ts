import {SeenImageData} from '@/src/domain/SeenImageData';
import {UserHistoryData} from '@/src/domain/UserHistoryData';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';
import {SetPreferredTimeCommand, SetTimeZoneCommand} from '@/src/services/NextImageServices/NextImageCommands';
import {API_CONFIG} from '@/src/config/apiConfig';
import {restGet, restPost} from '@/src/services/rest/restFetch';

type SeenImageDTO = {
    artworkId: number;
    seenAt: number;
};

type UserHistoryDTO = {
    seenImages: SeenImageDTO[];
    preferredTimeInHours: number;
    preferredTimeInMinutes: number;
};

const BASE = `${API_CONFIG.nextImageService}/api/next-image`;

export class RestNextImageClient implements INextImageClient {
    async getHistory(): Promise<UserHistoryData> {
        const res = await restGet<UserHistoryDTO>(`${BASE}/history`);
        return new UserHistoryData(
            res.seenImages.map(dto => new SeenImageData(dto.artworkId, new Date(dto.seenAt))),
            res.preferredTimeInHours,
            res.preferredTimeInMinutes,
        );
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

    async setTimeZone(command: SetTimeZoneCommand): Promise<void> {
        await restPost<SetTimeZoneCommand, void>(`${BASE}/set-time-zone`, {timeZoneId: command.timeZoneId});
    }
}
