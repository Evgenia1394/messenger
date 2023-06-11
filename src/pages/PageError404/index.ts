import {pageErrorTpl404} from './PageErrorTpl404';
import Block from "../../utils/Block";
import {ButtonBlock} from "../../components/ButtonBlock";

interface PageError404Props {
}

export class PageError404 extends Block<PageError404Props> {
    constructor(props: PageError404Props) {
        super({ type: 'div', ...props });
    }

    init() {
        this.children.backButton = new ButtonBlock({
            buttonTitle: 'Назад к чатам',
            events: {
                click: () => console.log('click')
            }
        })
    }

    render() {
        return this.compile(pageErrorTpl404, { ...this.props });
    }
}
