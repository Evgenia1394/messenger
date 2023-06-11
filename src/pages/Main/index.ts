import {mainTpl} from "./MainTpl";
import Block from "../../utils/Block";

interface MainProps {
}

export class Main extends Block<MainProps> {
    constructor(props: MainProps) {
        super({type: 'div', ...props});
    }

    init() {}

    render() {
        return this.compile(mainTpl, { ...this.props });
    }


}
