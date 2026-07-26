import {ApiProtocol} from '@/src/config/apiProtocol';
import {IUserClient} from './IUserClient';
import {RestUserClient} from './rest/RestUserClient';
import {GrpcUserClient} from './grpc/GrpcUserClient';
import {GraphqlUserClient} from './graphql/GraphqlUserClient';

export function createUserClient(protocol: ApiProtocol): IUserClient {
    switch (protocol) {
        case ApiProtocol.REST:    return new RestUserClient();
        case ApiProtocol.GRPC:    return new GrpcUserClient();
        case ApiProtocol.GRAPHQL: return new GraphqlUserClient();
    }
}
