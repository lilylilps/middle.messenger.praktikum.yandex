import template from './signUp.hbs';

import {Button} from '../../components/Button';
import {Input} from '../../components/Input';

import Block from '../../utils/Block';
import {renderDOM} from '../../utils/router';

const INPUT_PLACEHOLDERS = {
    login: 'ivanivanov',
    password: '6-12 символов'
}

export class SignUpPage extends Block {
    init() {
        this.children.enterButton = new Button({
            label: 'Вход',
            color: 'blue',
            type: 'submit',
            events: {
                click: (event: Event) => this.onSubmit(event),
            },
        });

        this.children.registerButton = new Button({
            label: 'Нет аккаунта?',
            color: 'transparent-blue',
            type: 'button',
            events: {
                click: () => renderDOM('signIn'),
            },
        });

        this.children.loginInput = new Input({
            direction: "vertical",
            name: "login",
            label: "Логин",
            type: "text",
            placeholder: INPUT_PLACEHOLDERS.login
        });

        this.children.passwordInput = new Input({
            direction: "vertical",
            name: "password",
            label: "Пароль",
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
