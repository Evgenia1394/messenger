import {profileFieldTpl} from "./profileFieldTpl";
import Block from "../../utils/Block";


interface ProfileFieldProps {
    type?: string,
    name?: string,
    value?: string,
}

export class ProfileField extends Block<ProfileFieldProps> {
    constructor(props: ProfileFieldProps) {
        super({ type: 'div', ...props });
    }

    init() {
    }

    render() {
        return this.compile(profileFieldTpl, { ...this.props });
    }
}
