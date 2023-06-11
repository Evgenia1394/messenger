
export class WebSocketClient {
    private url: string;
    public socket: WebSocket | null;
    public onopen: ((event: Event) => void) | null;
    public onclose: ((event: CloseEvent) => void) | null;
    public onmessage: ((event: MessageEvent) => void) | null;
    public onerror: ((event: Event) => void) | null;
    // @ts-ignore
    private chatId: any;

    constructor(url: string, chatId: any) {
        this.url = url;
        this.socket = null;
        this.onopen = null;
        this.onclose = null;
        this.onmessage = null;
        this.onerror = null;
        this.chatId = chatId;
    }

    public oldMessages: Message[] | null = null;

    connect() {
        this.socket = new WebSocket(this.url);
        this.socket.addEventListener('open', event => {
            console.log('Соединение установлено');
            if (this.onopen) {
                this.onopen(event);
            }
        });

        this.socket.addEventListener('close', event => {
            console.log('Соединение закрыто');
            if (this.onclose) {
                this.onclose(event);
            }
        });

        this.socket.addEventListener('error', event => {
            console.error('Ошибка:', event);
            if (this.onerror) {
                this.onerror(event);
            }
        });

        setInterval(() => {
                const message = {
                    type: "ping"
                }
            if (this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify(message));
            } else if (this.socket.readyState === WebSocket.CLOSING || this.socket.readyState === WebSocket.CLOSING) {
                // @ts-ignore
                this.socket.connect()
            }
        }, 10000)
    }

    send(message: any) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));

        } else {
            console.error('Соединение не установлено');
        }
    }

    close() {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.close();
        }
    }
}

export interface Message {
    chat_id: number,
    time: string,
    type: string,
    user_id: string,
    content: string,
    file?: File
}
interface File {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
}
