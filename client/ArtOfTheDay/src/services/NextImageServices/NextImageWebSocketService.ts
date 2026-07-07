import { Client } from '@stomp/stompjs';
import { API_CONFIG } from '@/src/config/apiConfig';

type OnNewImageCallback = () => void;

export class NextImageWebSocketService {
    private client: Client | null = null;
    private subscribed = false;

    connect(token: string, onNewImage: OnNewImageCallback): void {
        if (this.client?.active) return;

        const wsUrl = API_CONFIG.nextImageService.replace(/^http/, 'ws') + '/ws';

        this.client = new Client({
            brokerURL: wsUrl,
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            reconnectDelay: 0,
            onConnect: () => {
                if (this.subscribed) return;
                this.subscribed = true;
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
        this.subscribed = false;
    }
}
