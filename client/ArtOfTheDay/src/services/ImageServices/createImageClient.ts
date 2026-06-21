import {ApiProtocol} from '@/src/config/apiProtocol';
import {IImageClient} from './IImageClient';
import {RestImageClient} from './rest/RestImageClient';
import {GrpcImageClient} from './grpc/GrpcImageClient';
import {GraphqlImageClient} from './graphql/GraphqlImageClient';

export function createImageClient(protocol: ApiProtocol): IImageClient {
    switch (protocol) {
        case ApiProtocol.REST:    return new RestImageClient();
        case ApiProtocol.GRPC:    return new GrpcImageClient();
        case ApiProtocol.GRAPHQL: return new GraphqlImageClient();
    }
}
