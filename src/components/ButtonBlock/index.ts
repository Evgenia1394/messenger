import Block from '../../utils/Block';
import {buttonBlockTpl} from "./ButtonBlockTpl";

interface ButtonProps {
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

export class ButtonBlock extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super({ type: 'button', ...props });
    }

    init() {
    }

    render() {
        return this.compile(buttonBlockTpl, { ...this.props });
    }
}
