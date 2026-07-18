let tokenProvider: (() => Promise<string | null>) | null = null;

export function setTokenProvider(provider: () => Promise<string | null>) {
    tokenProvider = provider;
}

async function getAuthHeaders(): Promise<HeadersInit> {
    const token = await tokenProvider?.();
    return token ? {Authorization: `Bearer ${token}`} : {};
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`HTTP ${response.status} ${response.url}${body ? ': ' + body : ''}`);
    }
    const text = await response.text();
    return (text ? JSON.parse(text) : undefined) as T;
}

export async function restPost<TBody, TResponse>(url: string, body: TBody): Promise<TResponse> {
    const headers: HeadersInit = {'Content-Type': 'application/json', ...await getAuthHeaders()};
    const response = await fetch(url, {method: 'POST', headers, body: JSON.stringify(body)});
    return handleResponse<TResponse>(response);
}

export async function restGet<TResponse>(url: string): Promise<TResponse> {
    const headers = await getAuthHeaders();
    const response = await fetch(url, {method: 'GET', headers});
    return handleResponse<TResponse>(response);
}

export async function restPut<TBody, TResponse = void>(url: string, body: TBody): Promise<TResponse> {
    const headers: HeadersInit = {'Content-Type': 'application/json', ...await getAuthHeaders()};
    const response = await fetch(url, {method: 'PUT', headers, body: JSON.stringify(body)});
    return handleResponse<TResponse>(response);
}

export async function restDelete<TBody, TResponse = void>(url: string, body: TBody): Promise<TResponse> {
    const headers: HeadersInit = {'Content-Type': 'application/json', ...await getAuthHeaders()};
    const response = await fetch(url, {method: 'DELETE', headers, body: JSON.stringify(body)});
    return handleResponse<TResponse>(response);
}
