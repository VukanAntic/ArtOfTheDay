import { Client } from '@stomp/stompjs';
import { API_CONFIG } from '@/src/config/apiConfig';

type OnNewImageCallback = () => void;
type TokenProvider = () => Promise<string | null>;

const RECONNECT_DELAY_MS = 5000;

export class NextImageWebSocketService {
    private client: Client | null = null;

    connect(getToken: TokenProvider, onNewImage: OnNewImageCallback): void {
        if (this.client?.active) return;

        const wsUrl = API_CONFIG.nextImageService.replace(/^http/, 'ws') + '/ws';

        this.client = new Client({
            brokerURL: wsUrl,
            forceBinaryWSFrames: true,
            appendMissingNULLonIncoming: true,
            reconnectDelay: RECONNECT_DELAY_MS,
            beforeConnect: async (client) => {
                const token = await getToken();
                if (!token) {
                    await client.deactivate();
                    return;
                }
                client.connectHeaders = {Authorization: `Bearer ${token}`};
            },
            onConnect: () => {
                this.client?.subscribe('/user/queue/new-image', () => {
                    onNewImage();
                });
            },
            onStompError: (frame) => {
                console.error('WebSocket STOMP error:', frame.headers['message']);
            },
            onWebSocketError: () => {
                console.error('WebSocket connection error');
            },
        });

        this.client.activate();
    }

    disconnect(): void {
        this.client?.deactivate();
        this.client = null;
    }
}
