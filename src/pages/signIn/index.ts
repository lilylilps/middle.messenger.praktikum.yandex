import template from './signIn.hbs';

import {Button} from '../../components/Button';
import {Input} from '../../components/Input';

import Block from '../../utils/Block';
import {renderDOM} from '../../utils/router';

const INPUT_PLACEHOLDERS = {
    email: 'ivanivanov@yandex.ru',
    login: 'ivanivanov',
    firstName: 'Иван',
    secondName: 'Иванов',
    phone: '+79995555555',
    password: '6-12 символов'
}

export class SignInPage extends Block {
    init() {
        this.children.registerButton = new Button({
            label: 'Зарегистрироваться',
            color: 'blue',
            type: 'submit',
            events: {
                click: (event: Event) => {
                    this.onSubmit(event);
                    renderDOM('profile')
                },
            },
        });

        this.children.enterButton = new Button({
            label: 'Войти',
            color: 'transparent-blue',
            type: 'button',
            events: {
            click: () => renderDOM('signUp'),
            },
        });

        this.children.emailInput = new Input({
            direction: "vertical",
            name: "email",
            label: "Email",
            type: "email",
            placeholder: INPUT_PLACEHOLDERS.email
        });

        this.children.loginInput = new Input({
            direction: "vertical",
            name: "login",
            label: "Логин",
            type: "text",
            placeholder: INPUT_PLACEHOLDERS.login
        });

        this.children.firstNameInput = new Input({
            direction: "vertical",
            name: "first_name",
            label: "Имя",
            type: "text",
            placeholder: INPUT_PLACEHOLDERS.firstName
        });

        this.children.secondNameInput = new Input({
            direction: "vertical",
            name: "second_name",
            label: "Фамилия",
            type: "text",
            placeholder: INPUT_PLACEHOLDERS.secondName
        });

        this.children.phoneInput = new Input({
            direction: "vertical",
            name: "phone",
            label: "Телефон",
            type: "tel",
            placeholder: INPUT_PLACEHOLDERS.phone
        });

        this.children.newPasswordInput = new Input({
            direction: "vertical",
            name: "new_password",
            label: "Пароль",
            type: "password",
            placeholder: INPUT_PLACEHOLDERS.password
        });

        this.children.repeatPasswordInput = new Input({
            direction: "vertical",
            name: "repeat_password",
            label: "Пароль (еще раз)",
            type: "password",
            placeholder: INPUT_PLACEHOLDERS.password
        });
    }

    onSubmit(event: Event) {
        event.preventDefault();
        const values = Object
            .values(this.children)
            .filter(child => child instanceof Input)
            .map((child) => ([(child as Input).getName(), (child as Input).getValue()]));

        const data = Object.fromEntries(values);
        console.log(data);
    }

    render() {
        return this.compile(template, this.props);
    }
}
