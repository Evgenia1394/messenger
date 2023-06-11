import {profileTpl} from "./profileTpl";
import {ProfileField} from "../../components/ProfileField";
import Block from "../../utils/Block";
import {ButtonBlock} from "../../components/ButtonBlock";
import Router from "../../services/Router/Router";
import {ProfileAPI} from "../../api/profile.api";
import {connect} from "../../Store/connect";
import {PageTitle} from "../../components/PageTitle";
import {AddChangePhotoListener, ConnectedInputAvatarBlock} from "../../components/InputAvatar";
import {BASE_URL} from "../../api/base-api";
import {initialUser} from "../../Store/store";
import {BackButton} from "../../components/BackButton";

interface ProfileProps {
}

export class Profile extends Block<ProfileProps> {
    constructor(props: ProfileProps) {
        super({ type: 'div', ...props });
    }
    public router = new Router('.app');

    init () {
        this.children.btnChangeProfile = new ButtonBlock({
            buttonTitle: 'Изменить данные',
            events: {
                click: () => this.ToChangeDataPage()
            }
        });
        this.children.btnChangePassword = new ButtonBlock({
            buttonTitle: 'Изменить пароль',
            events: {
                click: () => this.ToChangeDataPasswordPage()
            }
        });
        this.children.btnExit = new ButtonBlock({
            buttonTitle: 'Выйти',
            events: {
                click: () => this.LogoutRequest()
            }
        });

        this.children.emailField = new ProfileField({name: 'Почта', value: (this.props as UserProps).email});
        this.children.loginField = new ProfileField({name: 'Логин', value: (this.props as UserProps).login});
        this.children.firstNameField = new ProfileField({name: 'Имя', value: (this.props as UserProps).first_name});
        this.children.secondNameField = new ProfileField({name: 'Фамилия', value: (this.props as UserProps).second_name});
        this.children.secondNameField = new ProfileField({name: 'Имя в чате', value: (this.props as UserProps).display_name});
        this.children.phoneNumberField = new ProfileField({name: 'Номер телефона', value: (this.props as UserProps).phone});

        this.children.titleName = new PageTitle({
            Title: (this.props as UserProps).first_name
        });
        this.children.avatarInput = new ConnectedInputAvatarBlock({
            url: `${BASE_URL}/resources/${(this.props as UserProps).avatar}`,
            events: {
                change: () => {
                    AddChangePhotoListener();
                },
            }
        })

        this.children.backButton = new BackButton({
            events: {
                click: () => {
                    this.router.back()}
            }
        })

    }

    componentDidUpdate(oldProps: UserProps, newProps: UserProps) {
        if (oldProps !== newProps) {
            this.children.emailField = new ProfileField({name: 'Почта', value: (this.props as UserProps).email});
            this.children.loginField = new ProfileField({name: 'Логин', value: (this.props as UserProps).login});
            this.children.firstNameField = new ProfileField({name: 'Имя', value: (this.props as UserProps).first_name});
            this.children.secondNameField = new ProfileField({name: 'Фамилия', value: (this.props as UserProps).second_name});
            this.children.secondNameField = new ProfileField({name: 'Имя в чате', value: (this.props as UserProps).display_name});
            this.children.phoneNumberField = new ProfileField({name: 'Номер телефона', value: (this.props as UserProps).phone});

            this.children.titleName = new PageTitle({
                Title: (this.props as UserProps).first_name
            });
            this.children.avatarInput = new ConnectedInputAvatarBlock({
                url: `${BASE_URL}/resources/${(this.props as UserProps).avatar}`,
                events: {
                    change: () => {
                        AddChangePhotoListener();
                    },
                }
            })
            return true;
        }
    }


    public async LogoutRequest() {
        const result = await new ProfileAPI().requestLogout();
        if (!result) {
            return;
        } else {
            this.router.go('/login')
        }
    }

    public async ToChangeDataPage() {
        this.router.go('/change-data');
    }

    public async ToChangeDataPasswordPage() {
        this.router.go('/change-password');
    }

    render () {
        return this.compile(profileTpl, { ...this.props });
    }
}

export function mapUserToProps(state: any) {
    if (!Object.keys(state).length) {
        return initialUser;
    }
    return {
        display_name: state.user.display_name,
        avatar: state.user.avatar,
        email: state.user.email,
        first_name: state.user.first_name,
        login: state.user.login,
        id: state.user.id,
        phone: state.user.phone,
        second_name: state.user.second_name,
    };
}
// @ts-ignore
export const ConnectedProfile = connect(Profile, mapUserToProps);

export interface UserProps {
    display_name: string;
    avatar: string;
    email: string;
    first_name: string;
    login: string;
    id: string;
    phone: string;
    second_name: string;
}



