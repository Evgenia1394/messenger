import Block from "../../utils/Block";
import {PageTitleTpl} from "./PageTitleTpl";

export interface PageTitleProps {
    type?: string,
    text?: string,
    name?: string,
    count?: string,
    time?: string,
    events?: {
        click?: () => void;
        focusin?: (value: string | number) => void;
        focusout?: (value: string | number) => void;
    };
    Title?: string;
}

export class PageTitle extends Block<PageTitleProps> {
    constructor(props: PageTitleProps) {
        super({type: 'div', ...props});
    }

    init() {}

    render() {
        return this.compile(PageTitleTpl, { ...this.props });
    }
}
