import {backButtonTpl} from "./backButtonTpl";

import Block from '../../utils/Block';

interface BackButtonProps {
    type?: string;
    label?: string;
    className?: string;
    events?: {
        click: () => void;
    };
    buttonTitle?: string;
}

export class BackButton extends Block<BackButtonProps> {
    constructor(props: BackButtonProps) {
        super({ type: 'button', ...props });
    }

    init() {
    }

    render() {
        return this.compile(backButtonTpl, { ...this.props });
    }
}

