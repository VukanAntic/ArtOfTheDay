import {ITutorialClient} from '@/src/services/TutorialServices/ITutorialClient';
import {FtueCompleteCommand} from '@/src/services/TutorialServices/TutorialCommands';
import {API_CONFIG} from '@/src/config/apiConfig';
import {graphqlRequest} from '@/src/services/graphql/graphqlFetch';

const ENDPOINT = `${API_CONFIG.identityService}/graphql`;

export class GraphqlTutorialClient implements ITutorialClient {
    async ftueComplete(command: FtueCompleteCommand): Promise<void> {
        await graphqlRequest(
            ENDPOINT,
            `mutation($artworkIds: [Int!]!, $genreIds: [ID!]!, $artistIds: [Int!]!) {
                ftueComplete(artworkIds: $artworkIds, genreIds: $genreIds, artistIds: $artistIds)
            }`,
            {
                artworkIds: command.artworkIds,
                genreIds: command.genreIds,
                artistIds: command.artistIds,
            },
        );
    }
}
