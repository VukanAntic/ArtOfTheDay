import { Client } from '@stomp/stompjs';
import { API_CONFIG } from '@/src/config/apiConfig';

type OnNewImageCallback = () => void;

export class NextImageWebSocketService {
    private client: Client | null = null;

    connect(token: string, onNewImage: OnNewImageCallback): void {
        const wsUrl = API_CONFIG.nextImageService.replace(/^http/, 'ws') + '/ws/websocket';

        this.client = new Client({
            brokerURL: wsUrl,
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            onConnect: () => {
                this.client?.subscribe('/user/queue/new-image', () => {
                    onNewImage();
                });
            },
            onStompError: (frame) => {
                console.error('WebSocket STOMP error:', frame.headers['message']);
            },
        });

        this.client.activate();
    }

    disconnect(): void {
        this.client?.deactivate();
        this.client = null;
    }
}
