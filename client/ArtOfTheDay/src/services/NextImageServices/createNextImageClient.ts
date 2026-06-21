import {ApiProtocol} from '@/src/config/apiProtocol';
import {INextImageClient} from './INextImageClient';
import {RestNextImageClient} from './rest/RestNextImageClient';
import {GrpcNextImageClient} from './grpc/GrpcNextImageClient';
import {GraphqlNextImageClient} from './graphql/GraphqlNextImageClient';

export function createNextImageClient(protocol: ApiProtocol): INextImageClient {
    switch (protocol) {
        case ApiProtocol.REST:    return new RestNextImageClient();
        case ApiProtocol.GRPC:    return new GrpcNextImageClient();
        case ApiProtocol.GRAPHQL: return new GraphqlNextImageClient();
    }
}
