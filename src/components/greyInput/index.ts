import {greyInputTpl} from "./greyInputTpl";
import Block from "../../utils/Block";

export interface GreyInputProps {
    placeholder?: string,
    type?: string,
    id?: string,
    name?: string,
    value?: string,
    label?: string,
    events?: {
        click?: () => void;
        focusin?: (value: FocusEvent) => void;
        focusout?: (value: FocusEvent) => void;
    };
}

export class GreyInput extends Block<GreyInputProps> {
    constructor(props: GreyInputProps) {
        super({type: 'input', ...props});
    }

    public get value() {
        return (this.element as HTMLInputElement).value;
    }
    init() {}

    render() {
        return this.compile(greyInputTpl, { ...this.props });
    }
}
