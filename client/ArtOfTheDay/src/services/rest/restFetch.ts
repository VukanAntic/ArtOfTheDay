async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const message = await response.text().catch(() => `HTTP ${response.status}`);
        throw new Error(message);
    }
    return response.json() as Promise<T>;
}

export async function restPost<TBody, TResponse>(
    url: string,
    body: TBody,
    token?: string,
): Promise<TResponse> {
    const headers: HeadersInit = {'Content-Type': 'application/json'};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
    return handleResponse<TResponse>(response);
}

export async function restGet<TResponse>(
    url: string,
    token?: string,
): Promise<TResponse> {
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(url, {method: 'GET', headers});
    return handleResponse<TResponse>(response);
}

export async function restPut<TBody, TResponse = void>(
    url: string,
    body: TBody,
    token?: string,
): Promise<TResponse> {
    const headers: HeadersInit = {'Content-Type': 'application/json'};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
    });
    return handleResponse<TResponse>(response);
}
