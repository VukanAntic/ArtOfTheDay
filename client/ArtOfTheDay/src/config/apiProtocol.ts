export enum ApiProtocol {
    REST = 'REST',
    GRPC = 'GRPC',
    GRAPHQL = 'GRAPHQL',
}

export const CURRENT_PROTOCOL: ApiProtocol =
    (process.env.EXPO_PUBLIC_API_PROTOCOL as ApiProtocol) ?? ApiProtocol.REST;
