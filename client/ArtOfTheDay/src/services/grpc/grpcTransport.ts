import {createGrpcWebTransport} from '@connectrpc/connect-web';
import type {Interceptor} from '@connectrpc/connect';
import {fetch as expoFetch} from 'expo/fetch';
import {API_CONFIG} from '@/src/config/apiConfig';
import {getAuthToken} from '@/src/services/rest/restFetch';

const authInterceptor: Interceptor = (next) => async (req) => {
    const token = await getAuthToken();
    if (token) {
        req.header.set('Authorization', `Bearer ${token}`);
    }
    return next(req);
};

export const grpcTransport = createGrpcWebTransport({
    baseUrl: API_CONFIG.grpcWebUrl,
    interceptors: [authInterceptor],
    fetch: expoFetch as unknown as typeof globalThis.fetch,
});
