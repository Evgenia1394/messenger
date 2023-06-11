import {pageErrorTpl500} from './PageErrorTpl500';
import Block from "../../utils/Block";
import {ButtonBlock} from "../../components/ButtonBlock";

interface PageError500Props {
}

export class PageError500 extends Block<PageError500Props> {
    constructor(props: PageError500Props) {
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
        return this.compile(pageErrorTpl500, { ...this.props });
    }
}
