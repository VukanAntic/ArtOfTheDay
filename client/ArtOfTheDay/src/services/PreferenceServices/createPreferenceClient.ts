import {ApiProtocol} from '@/src/config/apiProtocol';
import {IPreferenceClient} from './IPreferenceClient';
import {RestPreferenceClient} from './rest/RestPreferenceClient';
import {GrpcPreferenceClient} from './grpc/GrpcPreferenceClient';
import {GraphqlPreferenceClient} from './graphql/GraphqlPreferenceClient';

export function createPreferenceClient(protocol: ApiProtocol): IPreferenceClient {
    switch (protocol) {
        case ApiProtocol.REST:    return new RestPreferenceClient();
        case ApiProtocol.GRPC:    return new GrpcPreferenceClient();
        case ApiProtocol.GRAPHQL: return new GraphqlPreferenceClient();
    }
}
