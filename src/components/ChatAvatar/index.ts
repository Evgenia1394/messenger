import Block from '../../utils/Block';
import {ChatAvatarTpl} from "./ChatAvatarTpl";

interface ChatAvatarProps {
    type?: string;
    label?: string;
    className?: string;
    typeAction?: string;
    formName?: string;
    events?: {
        click?: () => void;
        submit?: () => void;
    };
    url: string;
}

export class ChatAvatar extends Block<ChatAvatarProps> {
    constructor(props: ChatAvatarProps) {
        super({ type: 'div', ...props });
    }

    init() {
    }

    render() {
        return this.compile(ChatAvatarTpl, { ...this.props });
    }
}
