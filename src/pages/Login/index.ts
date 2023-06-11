import {loginTpl} from "./LoginTpl";
import Block from "../../utils/Block";
import {ButtonBlock} from "../../components/ButtonBlock";
import {InputBlock} from "../../components/InputBlock";
import {isValidForm, validateInput} from "../../utils/Validators";
import Router from "../../services/Router/Router";
import {LoginAPI} from "../../api/Login.api";

interface LoginProps {
}

export class Login extends Block<LoginProps> {
    constructor(props: LoginProps) {
        super({ type: 'div', ...props });
    }
    public router = new Router('.app');

    init() {
        this.children.authorizeButton = new ButtonBlock({
            buttonTitle: 'Авторизоваться',
            events: {
                click: () => this.SignInRequest()
            }
        });
        this.children.registrationButton = new ButtonBlock({
            buttonTitle: 'Нет аккаунта',
            events: {
                click: () => this.router.go('/registration')
            }
        });
        this.children.loginInput = new InputBlock({
            type: 'text',
            name: 'login',
            id: 'login',
            placeholder: 'Введите логин',
            label: 'Логин',
            value: null,
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            },
        });
        this.children.passwordInput = new InputBlock({
            type: 'password',
            name: 'password',
            id: 'password',
            placeholder: 'Введите пароль',
            label: 'Пароль',
            value: null,
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            },
        });
    }

    public SignInRequest = async () => {
        if (!isValidForm()) {
            console.log('!isValidForm')
            return;
        }
        const dataSignUp = {
            login: (document.querySelector('input[name="login"]') as HTMLInputElement).value,
            password: (document.querySelector('input[name="password"]') as HTMLInputElement).value,
        }

        const result = await new LoginAPI().requestLogin(dataSignUp);
        if (result?.reason) {
            console.log('не удалось войти', result.reason);
            return;
        } else {
            this.router.go('/messages')
        }
    }


    render() {
        return this.compile(loginTpl, { ...this.props });
    }
}

