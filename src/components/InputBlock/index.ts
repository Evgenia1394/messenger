import Block from "../../utils/Block";
import {inputTpl} from "./inputBlockTpl";

export interface InputBlockProps {
    placeholder?: string,
    type?: string,
    id?: string,
    name?: string,
    value?: string | null,
    label?: string,
    events?: {
        click?: () => void;
        focusin?: (value: any) => void;
        focusout?: (value: any) => void;
    };
}

export class InputBlock extends Block<InputBlockProps> {
    constructor(props: InputBlockProps) {
        super({type: 'input', ...props});
    }

    public get value() {
        return (this.element as HTMLInputElement).value;
    }
    init() {}

    render() {
        return this.compile(inputTpl, { ...this.props });
    }
}
