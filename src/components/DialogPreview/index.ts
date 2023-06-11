import {DialogPreviewTpl} from "./DialogPreview";
import Block from "../../utils/Block";
import {DeleteButtonBlock} from "../DeleteButton";
import {MessagesAPI} from "../../api/messages.api";
import Store from "../../Store/store";

export interface DialogPreviewProps {
    type?: string,
    text?: string,
    name?: string,
    count?: number,
    time?: string,
    avatar?: string,
    id?: string,
    events?: {
        click?: (e: MouseEvent) => void;
        focusin?: (value: FocusEvent) => void;
        focusout?: (value: FocusEvent) => void;
    };

}

export class DialogPreview extends Block<DialogPreviewProps> {
    constructor(props: DialogPreviewProps) {
        super({type: 'div', ...props});
    }

    public get value() {
        return (this.element as HTMLInputElement).value;
    }
    init() {
        this.children.deleteBtn = new DeleteButtonBlock({
            events: {
                click: (event) => this.deleteChat(event),
            }});
    }

    deleteChat(event: MouseEvent) {
        event.stopPropagation();
        const result = confirm("Вы уверены, что хотите удалить этот элемент?");
        if (result) {
            const requestData = {
                chatId: this.props.id!
            }
            return new MessagesAPI().deleteChatRequest(requestData)
                .then(()=> {
                    alert(`Чат ${this.props.name} успешно удален!`)
                    new MessagesAPI().requestChats().then((res)=> {
                        Store.set('chatList', res);
                    })
                }).catch(() => alert(`чат ${this.props.name} не удалось удалить`))
        } else {
            return;
        }
    }

    render() {
        return this.compile(DialogPreviewTpl, { ...this.props });
    }
}
