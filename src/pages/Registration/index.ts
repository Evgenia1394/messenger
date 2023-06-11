import {registrationTpl} from "./RegistrationTpl";
import Block from "../../utils/Block";
import {ButtonBlock} from "../../components/ButtonBlock";
import {isValidForm, validateInput} from "../../utils/Validators";
import {InputBlock} from "../../components/InputBlock";
import Router from "../../services/Router/Router";
import {RegistrationAPI} from '../../api/Registration.api'

interface RegistrationProps {
}

export class Registration extends Block<RegistrationProps> {
    constructor(props: RegistrationProps) {
        super({ type: 'div', ...props });
    }
    public router = new Router('.app');

    init() {
        this.children.registrationButton = new ButtonBlock({
            buttonTitle: 'Зарегистрироваться',
            events: {
                click: () => this.SignUpRequest()
            }
        });
        this.children.toLoginButton = new ButtonBlock({
            buttonTitle: 'Войти',
            events: {
                click: () => this.router.go('/login')
            }
        });
        this.children.emailInput = new InputBlock({
            type: 'email', name: 'email', id: 'email', label: 'Почта',
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            },
        });
        this.children.loginInput = new InputBlock({
            type: 'text', name: 'login', id: 'login', label: 'Логин',
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            },
        });
        this.children.firstNameInput = new InputBlock({
            type: 'text', name: 'first_name', id: 'firstName', label: 'Имя',
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            },
        });
        this.children.secondNameInput = new InputBlock({
            type: 'text', name: 'second_name', id: 'secondName', label: 'Фамилия',
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            },
        });
        this.children.phoneNumberInput = new InputBlock({
            type: 'tel', name: 'phone', id: 'phoneNumber', label: 'Телефон',
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            },
        });
        this.children.passwordFirstInput = new InputBlock({
            type: 'password', name: 'password', id: 'passwordFirst', label: 'Пароль',
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            },
        });
        this.children.passwordSecondInput = new InputBlock({
            type: 'password', name: 'password', id: 'passwordSecond', label: 'Пароль (еще раз)',
            events: {
                focusin: (e) => validateInput(e.target.value, e.target.name, e.target.id),
                focusout: (e) => validateInput(e.target.value, e.target.name, e.target.id),
            },
        });
    }

    public SignUpRequest = async () => {
        if (!isValidForm()) {
            return;
        }
        const dataSignUp = {
            first_name: (document.querySelector('input[name="first_name"]') as HTMLInputElement).value,
            second_name: (document.querySelector('input[name="second_name"]') as HTMLInputElement).value,
            login: (document.querySelector('input[name="login"]') as HTMLInputElement).value,
            email: (document.querySelector('input[name="email"]') as HTMLInputElement).value,
            password: (document.querySelector('input[name="password"]') as HTMLInputElement).value,
            phone: (document.querySelector('input[name="phone"]') as HTMLInputElement).value,
        }

        const result = await new RegistrationAPI().requestRegistration(dataSignUp);
        if (result?.reason) {
            console.log('не удалось зарегистрироваться', result.reason);
        } else {
            this.router.go('/messages')
        }
    }


    render() {
        return this.compile(registrationTpl, { ...this.props });
    }
}
