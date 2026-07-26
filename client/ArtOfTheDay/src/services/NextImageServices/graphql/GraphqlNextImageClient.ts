import {SeenImageData} from '@/src/domain/SeenImageData';
import {INextImageClient} from '@/src/services/NextImageServices/INextImageClient';
import {SetPreferredTimeCommand} from '@/src/services/NextImageServices/NextImageCommands';
import {API_CONFIG} from '@/src/config/apiConfig';
import {graphqlRequest} from '@/src/services/graphql/graphqlFetch';

type SeenImageDTO = {
    artworkId: number;
    seenAt: number;
};

const ENDPOINT = `${API_CONFIG.nextImageService}/graphql`;

export class GraphqlNextImageClient implements INextImageClient {
    async getHistory(): Promise<SeenImageData[]> {
        const data = await graphqlRequest<{history: SeenImageDTO[]}>(
            ENDPOINT,
            `query { history { artworkId seenAt } }`,
        );
        return data.history.map(dto => new SeenImageData(dto.artworkId, new Date(dto.seenAt)));
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
