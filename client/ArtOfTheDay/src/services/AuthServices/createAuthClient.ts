import {ApiProtocol} from '@/src/config/apiProtocol';
import {IAuthClient} from './IAuthClient';
import {RestAuthClient} from './rest/RestAuthClient';
import {GrpcAuthClient} from './grpc/GrpcAuthClient';
import {GraphqlAuthClient} from './graphql/GraphqlAuthClient';

export function createAuthClient(protocol: ApiProtocol): IAuthClient {
    switch (protocol) {
        case ApiProtocol.REST:     return new RestAuthClient();
        case ApiProtocol.GRPC:     return new GrpcAuthClient();
        case ApiProtocol.GRAPHQL:  return new GraphqlAuthClient();
    }
}
