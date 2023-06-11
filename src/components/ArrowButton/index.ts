import {arrowButtonTpl} from "./arrowButtonTpl";

import Block from '../../utils/Block';

interface ArrowButtonProps {
    type?: string;
    label?: string;
    className?: string;
    events?: {
        click: () => void;
    };
    buttonTitle?: string;
}

export class ArrowButton extends Block<ArrowButtonProps> {
    constructor(props: ArrowButtonProps) {
        super({ type: 'button', ...props });
    }

    init() {
    }

    render() {
        return this.compile(arrowButtonTpl, { ...this.props });
    }
}

