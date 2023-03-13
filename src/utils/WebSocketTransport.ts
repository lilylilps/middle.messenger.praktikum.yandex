import {EventBus} from './EventBus';

export enum WebSocketTransportEvents {
    Connected = 'connected',
    Error = 'error',
    Message = 'message',
    Close = 'close',
}

export default class WebSocketTransport extends EventBus {
    private socket: WebSocket | null = null;
    private pingInterval: number = 0;

    constructor(private url: string) {
        super();
    }

    public send(data: unknown) {
        if (!this.socket) {
            throw new Error('Socket is not connected');
        }

        this.socket.send(JSON.stringify(data));
    }

    public connect(): Promise<void> {
        this.socket = new WebSocket(this.url);

        this.subscribe(this.socket);

        this.setupPing();

        return new Promise((resolve) => {
            this.on(WebSocketTransportEvents.Connected, () => {
                resolve();
            });
        });
    }

    public close() {
        this.socket?.close();
    }

    private setupPing() {
        this.pingInterval = setInterval(() => {
        this.send({ type: 'ping' });
        }, 5000);

        this.on(WebSocketTransportEvents.Close, () => {
            clearInterval(this.pingInterval);

            this.pingInterval = 0;
        });
    }

    private subscribe(socket: WebSocket) {
        socket.addEventListener('open', () => {
            this.emit(WebSocketTransportEvents.Connected);
        });
        socket.addEventListener('close', () => {
            this.emit(WebSocketTransportEvents.Close);
        });

        socket.addEventListener('error', (e) => {
            this.emit(WebSocketTransportEvents.Error, e);
        });

        socket.addEventListener('message', (message) => {
            const data = JSON.parse(message.data);

            if (data.type && data.type === 'pong') {
                return;
            }

            this.emit(WebSocketTransportEvents.Message, data);
        });
    }
}
