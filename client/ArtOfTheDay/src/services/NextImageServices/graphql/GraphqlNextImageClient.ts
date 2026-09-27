import {SeenImageData} from '@/src/domain/SeenImageData';
import {UserHistoryData} from '@/src/domain/UserHistoryData';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';
import {SetPreferredTimeCommand} from '@/src/services/NextImageServices/NextImageCommands';
import {API_CONFIG} from '@/src/config/apiConfig';
import {graphqlRequest} from '@/src/services/graphql/graphqlFetch';

type SeenImageDTO = {
    artworkId: number;
    seenAt: number;
};

type UserHistoryDTO = {
    seenImages: SeenImageDTO[];
    preferredTimeInHours: number;
    preferredTimeInMinutes: number;
};

const ENDPOINT = `${API_CONFIG.nextImageService}/graphql`;

export class GraphqlNextImageClient implements INextImageClient {
    async getHistory(): Promise<UserHistoryData> {
        const data = await graphqlRequest<{history: UserHistoryDTO}>(
            ENDPOINT,
            `query { history { seenImages { artworkId seenAt } preferredTimeInHours preferredTimeInMinutes } }`,
        );
        return new UserHistoryData(
            data.history.seenImages.map(dto => new SeenImageData(dto.artworkId, new Date(dto.seenAt))),
            data.history.preferredTimeInHours,
            data.history.preferredTimeInMinutes,
        );
    }

    async setPreferredTime(command: SetPreferredTimeCommand): Promise<void> {
        await graphqlRequest(
            ENDPOINT,
            `mutation($preferredTimeInHours: Int!, $preferredTimeInMinutes: Int!, $timeZoneId: String!) {
                setPreferredTime(
                    preferredTimeInHours: $preferredTimeInHours
                    preferredTimeInMinutes: $preferredTimeInMinutes
                    timeZoneId: $timeZoneId
                )
            }`,
            {
                preferredTimeInHours: command.preferredTimeInHours,
                preferredTimeInMinutes: command.preferredTimeInMinutes,
                timeZoneId: command.timeZoneId,
            },
        );
    }
}
