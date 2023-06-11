import {messagesDataTpl} from "./messagesDataTpl";
import Block from "../../utils/Block";
import {DialogPreview} from "../../components/DialogPreview";
import Router from "../../services/Router/Router";
import Store from "../../Store/store";
import {PageTitle} from "../../components/PageTitle";
import {BASE_URL} from "../../api/base-api";

interface MessagesProps {
    type?: string;
    label?: string;
    className?: string;
    typeAction?: string;
    formName?: string;
    events?: {
        click?: () => void;
        submit?: () => void;
    };
    buttonTitle?: string;
}
export class MessagesBlock extends Block<MessagesProps> {
    constructor(props: MessagesProps) {
        super({ type: 'div', ...props });
    }
    public router = new Router()

    init() {
        this.children.dialogPreview = new PageTitle({Title: 'нет чатов'})
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        // @ts-ignore
        if (newProps?.chatList && this.props.chatList.length) {
            // @ts-ignore
            this.children.dialogPreview = newProps.chatList.map(chat => {
                return new DialogPreview(
                    {
                        id: chat.id,
                        name: chat?.title ? chat?.title : 'Неизвестный отправитель',
                        text: chat.last_message?.content ? chat.last_message?.content : 'Неизвестное сообщение',
                        time: chat.last_message?.time ? chat.last_message?.time : 'Неизветнокогда',
                        count: Number(chat.unread_count) ? Number(chat.unread_count) : 0,
                        avatar: `${BASE_URL}/resources${chat.avatar}`,
                        events: {
                            click: (e) => this.openChat(e, +chat.id)
                        }
                    })
            });
        }
        return super.componentDidUpdate(oldProps, newProps);
    }

    async openChat(e: Event, chatId: number | string) {
        e.preventDefault()
        const currentUrl = window.location.pathname;
        const cleanedUrl = currentUrl.replace(/\/\d+$/, '');
        const newUrl = `${cleanedUrl}/${chatId}`;
        Store.set('currentChatId', Number(chatId));
        history.pushState(null, null, newUrl);
    }

    render() {
        return this.compile(messagesDataTpl, { ...this.props });
    }

}
