import Block from "../../utils/Block";
import {MessageTpl} from "./MessageTpl";

interface MessageProps {
    type?: string;
    label?: string;
    className?: string;
    typeAction?: string;
    formName?: string;
    events?: {
        click?: () => void;
        submit?: () => void;
    };
    userName?: string;
    text?: string;
    time?: string;
}

export class Message extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super({ type: 'div', ...props });
    }

    init() {
        this.props.time = !this.props.time ? this.props.time : this.parseTimeFromDate(this.props.time)
    }

    render() {
        return this.compile(MessageTpl, { ...this.props });
    }

    parseTimeFromDate(dateString: string) {
        const date = new Date(Date.parse(dateString));
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes}`
    }
}
