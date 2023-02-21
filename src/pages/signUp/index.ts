import template from './signUp.hbs';

import {Button} from '../../components/Button';
import {Input} from '../../components/Input';

import Block from '../../utils/Block';
import {renderDOM} from '../../utils/router';
import {submitHandler} from '../../utils/submitHandler';

const INPUT_PLACEHOLDERS = {
    login: 'ivanivanov',
    password: 'не менее 6 символов'
}

export class SignUpPage extends Block {
    init() {
        this.children.enterButton = new Button({
            label: 'Вход',
            color: 'blue',
            type: 'submit',
            events: {
                click: (event: Event) => submitHandler(event, this.children, 'profile'),
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
            placeholder: INPUT_PLACEHOLDERS.login,
            required: true
        });

        this.children.passwordInput = new Input({
            direction: "vertical",
            name: "password",
            label: "Пароль",
            type: "password",
            placeholder: INPUT_PLACEHOLDERS.password,
            required: true
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
