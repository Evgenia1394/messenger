import {changeDataTpl} from "./changeDataTpl";
import Block from "../../utils/Block";
import {ButtonBlock} from "../../components/ButtonBlock";
import {InputBlock} from "../../components/InputBlock";
import {isValidForm, validateInput} from "../../utils/Validators";
import {connect} from "../../Store/connect";
import {mapUserToProps, UserProps} from "../Profile";
import {PageTitle} from "../../components/PageTitle";
import {ProfileController} from "./profile.controller";
import {
    AddChangePhotoListener,
    ConnectedInputAvatarBlock,
} from "../../components/InputAvatar";
import Store from "../../Store/store";

interface ChangeDataProps {
}

export class ChangeData extends Block<ChangeDataProps> {
    constructor(props: ChangeDataProps) {
        super({ type: 'div', ...props });
    }

    init() {
        this.children.btn = new ButtonBlock({
            buttonTitle: 'Сохранить изменения',
            events: {
                click: () => this.ChangeProfileRequest(),
            },
            typeAction: 'submit',
            formName: 'change_data'
        });
        this.children.emailInput = new InputBlock({
            type: 'text',
            name: 'email',
            id: 'email',
            value: (this.props as UserProps).email,
            label: 'Почта',
            placeholder: (this.props as UserProps).email,
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            }});
        this.children.loginInput = new InputBlock({
            type: 'text',
            name: 'login',
            id: 'login',
            value: (this.props as UserProps).login,
            label: 'Логин',
            placeholder: (this.props as UserProps).login,
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            }});
        this.children.firstNameInput = new InputBlock({
            type: 'text',
            name: 'first_name',
            id: 'firstName',
            value: (this.props as UserProps).first_name,
            label: 'Имя',
            placeholder: (this.props as UserProps).first_name,
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            }});
        this.children.secondNameInput = new InputBlock({
            type: 'text',
            name: 'second_name',
            id: 'secondName',
            value: (this.props as UserProps).second_name,
            label: 'Фамилия',
            placeholder: (this.props as UserProps).second_name,
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            }});
        this.children.chatNameInput = new InputBlock({
            type: 'text',
            name: 'display_name',
            id: 'chatName',
            value: (this.props as UserProps).display_name,
            label: 'Имя в чате',
            placeholder: (this.props as UserProps).display_name,
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            }});
        this.children.phoneNumberInput = new InputBlock({
            type: 'tel',
            name: 'phone',
            id: 'phoneNumber',
            value: (this.props as UserProps).phone,
            label: 'Телефон',
            placeholder: (this.props as UserProps).phone,
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            }});
        this.children.titleName = new PageTitle({
            Title: (this.props as UserProps).first_name
        });
        this.children.avatarInput = new ConnectedInputAvatarBlock({url: `https://ya-praktikum.tech/api/v2/resources/${(this.props as UserProps).avatar}`,
            events: {
                change: () => {
                    AddChangePhotoListener();
                }
            }
        })
    }

    componentDidUpdate(oldProps: any, newProps: any) {
        if (oldProps !== newProps) {
            console.log('componentDidUpdate')
            this.children.emailInput = new InputBlock({
                type: 'text',
                name: 'email',
                id: 'email',
                value: (this.props as UserProps).email,
                label: 'Почта',
                placeholder: (this.props as UserProps).email,
                events: {
                    focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                    focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                }});
            this.children.loginInput = new InputBlock({
                type: 'text',
                name: 'login',
                id: 'login',
                value: (this.props as UserProps).login,
                label: 'Логин',
                placeholder: (this.props as UserProps).login,
                events: {
                    focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                    focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                }});
            this.children.firstNameInput = new InputBlock({
                type: 'text',
                name: 'first_name',
                id: 'firstName',
                value: (this.props as UserProps).first_name,
                label: 'Имя',
                placeholder: (this.props as UserProps).first_name,
                events: {
                    focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                    focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                }});
            this.children.secondNameInput = new InputBlock({
                type: 'text',
                name: 'second_name',
                id: 'secondName',
                value: (this.props as UserProps).second_name,
                label: 'Фамилия',
                placeholder: (this.props as UserProps).second_name,
                events: {
                    focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                    focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                }});
            this.children.chatNameInput = new InputBlock({
                type: 'text',
                name: 'display_name',
                id: 'chatName',
                value: (this.props as UserProps).display_name,
                label: 'Имя в чате',
                placeholder: (this.props as UserProps).display_name,
                events: {
                    focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                    focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                }});
            this.children.phoneNumberInput = new InputBlock({
                type: 'tel',
                name: 'phone',
                id: 'phoneNumber',
                value: (this.props as UserProps).phone,
                label: 'Телефон',
                placeholder: (this.props as UserProps).phone,
                events: {
                    focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                    focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                }});
            this.children.titleName = new PageTitle({
                Title: (this.props as UserProps).first_name
            });
            this.children.avatarInput = new ConnectedInputAvatarBlock({url: `https://ya-praktikum.tech/api/v2/resources/${(this.props as UserProps).avatar}`,
                events: {
                    change: () => {
                        AddChangePhotoListener();
                    }
                }
            })
            return true;
        }
    }

    public ChangeProfileRequest = async () => {
        event.preventDefault()
        if (!isValidForm()) {
            return;
        }
        const dataChangeProfile = {
            first_name: (document.querySelector('input[name="first_name"]') as HTMLInputElement).value,
            second_name: (document.querySelector('input[name="second_name"]') as HTMLInputElement).value,
            display_name: (document.querySelector('input[name="display_name"]') as HTMLInputElement).value,
            login: (document.querySelector('input[name="login"]') as HTMLInputElement).value,
            email: (document.querySelector('input[name="email"]') as HTMLInputElement).value,
            phone: (document.querySelector('input[name="phone"]') as HTMLInputElement).value,
        }
        await new ProfileController().ChangeProfileRequest(dataChangeProfile)
            .then(res => {
                alert('данные успешно изменены')
                Store.set('user', res)})
            .catch(() => alert('не удалось поменять данные'));
    }

    render() {
        return this.compile(changeDataTpl, { ...this.props });
    }
}
// @ts-ignore
export const ConnectedChangeData = connect(ChangeData, mapUserToProps);
