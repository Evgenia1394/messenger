import Block from '../../utils/Block';
import {deleteButtonBlockTpl} from "./DeleteButtonTpl";

interface DeleteButtonProps {
    type?: string;
    label?: string;
    className?: string;
    typeAction?: string;
    formName?: string;
    events?: {
        click?: (e: MouseEvent) => void;
    };
}

export class DeleteButtonBlock extends Block<DeleteButtonProps> {
    constructor(props: DeleteButtonProps) {
        super({ type: 'button', ...props });
    }

    init() {
    }

    render() {
        return this.compile(deleteButtonBlockTpl, { ...this.props });
    }
}
