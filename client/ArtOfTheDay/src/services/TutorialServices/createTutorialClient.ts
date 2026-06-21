import {ApiProtocol} from '@/src/config/apiProtocol';
import {ITutorialClient} from './ITutorialClient';
import {RestTutorialClient} from './rest/RestTutorialClient';
import {GrpcTutorialClient} from './grpc/GrpcTutorialClient';
import {GraphqlTutorialClient} from './graphql/GraphqlTutorialClient';

export function createTutorialClient(protocol: ApiProtocol): ITutorialClient {
    switch (protocol) {
        case ApiProtocol.REST:    return new RestTutorialClient();
        case ApiProtocol.GRPC:    return new GrpcTutorialClient();
        case ApiProtocol.GRAPHQL: return new GraphqlTutorialClient();
    }
}
