import {getAuthHeaders} from '@/src/services/rest/restFetch';

type GraphqlResponse<T> = {
    data?: T;
    errors?: {message: string}[];
};

export async function graphqlRequest<T>(
    url: string,
    query: string,
    variables: Record<string, unknown> = {},
): Promise<T> {
    const headers: HeadersInit = {'Content-Type': 'application/json', ...await getAuthHeaders()};
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({query, variables}),
    });
    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`HTTP ${response.status} ${response.url}${body ? ': ' + body : ''}`);
    }
    const json = (await response.json()) as GraphqlResponse<T>;
    if (json.errors?.length) {
        throw new Error(json.errors.map(e => e.message).join('; '));
    }
    return json.data as T;
}
