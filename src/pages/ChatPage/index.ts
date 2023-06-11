import {chatPageTpl} from "./chatPageTpl";
import {GreyInput} from "../../components/greyInput";
import Block from "../../utils/Block";
import {requiredValidation} from "../../utils/Validators";
import {MessagesBlock} from "../Messages";
import {ButtonBlock} from "../../components/ButtonBlock";
import Router from "../../services/Router/Router";
import Store from "../../Store/store";
import {IOneChatData, MessagesAPI} from "../../api/messages.api";
import {connect} from "../../Store/connect";
import {ConnectedCurrentChat} from "../CurrentChat";

interface ChatPageProps {
}

export class ChatPage extends Block<ChatPageProps> {
    constructor(props: ChatPageProps) {
        super({ type: 'div', ...props });
    }
    public router = new Router('.app');
    public messagesAPI = new MessagesAPI();

    init() {
        this.getChats()
            .then(result => Store.set('chatList', result))

        this.children.greyInput = new GreyInput({type: 'text', name: 'search', id: 'search', placeholder: 'Поиск', events: {
                focusin: (e: FocusEvent) => requiredValidation((e.target as HTMLInputElement).id),
                focusout: (e: FocusEvent) => requiredValidation((e.target as HTMLInputElement).id),
            }})

        this.children.toProfileBtn = new ButtonBlock({
            buttonTitle: 'Профиль',
            events: {
                click: () => this.ToProfile()
            }
        });
        this.children.toCreateNewChatBtn = new ButtonBlock({
            buttonTitle: 'Новый чат',
            events: {
                click: () => this.CreateChat()
            }
        });

        this.children.chatList = new ConnectedMessagesBlock({});

        this.children.currentChat = new ConnectedCurrentChat({});

    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if (newProps.currentChatId !== oldProps.currentChatId) {
            const state = Store.getState();
            if (!state.chatList) {
                return;
            } else {
                this.children.currentChat = new ConnectedCurrentChat({
                    id: state.chatList.find((chat: IOneChatData) => chat.id === state.currentChatId).id,
                    name: state.chatList.find((chat: IOneChatData) => chat.id === state.currentChatId).title
                });
            }
            return true;
        }
    }

    public ToProfile() {
        return this.router.go('/profile');
    }

    async CreateChat() {
        const text = 'Введи имя чата';
        const chatName = await prompt(text, 'Свинка Пэпа');
        if (chatName) {
            return await this.messagesAPI.createChatRequest({title: chatName})
                .then(() => {
                    alert(`чат ${chatName} успешно добавлен`)
                    this.getChats()}
                ).catch(() => alert(`чат ${chatName} не удалось добавить`))

        }
        return;
    }

    getChats() {
        return new MessagesAPI().requestChats().then((res)=> {
            Store.set('chatList', res);
            return res
    })
    }

    render() {
        return this.compile(chatPageTpl, { ...this.props });
    }
}


export function mapChatListToProps(state: any) {
    return {
        chatList: state.chatList,
        currentChatId: state.currentChatId
    };
}
// @ts-ignore
export const ConnectedChatPage = connect(ChatPage, mapChatListToProps);
// @ts-ignore
export const ConnectedMessagesBlock = connect(MessagesBlock, mapChatListToProps);

