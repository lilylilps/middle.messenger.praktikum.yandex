import template from './signIn.hbs';

import {Button} from '../../components/Button';
import {Input} from '../../components/Input';

import Block from '../../utils/Block';
import {renderDOM} from '../../utils/router';
import {submitHandler} from '../../utils/submitHandler';
import {validate} from '../../utils/validator';

const INPUT_PLACEHOLDERS = {
    email: 'ivanivanov@yandex.ru',
    login: 'ivanivanov',
    firstName: 'Иван',
    secondName: 'Иванов',
    phone: '+79995555555',
    password: 'не менее 6 символов'
}

export class SignInPage extends Block {
    init() {
        this.children.registerButton = new Button({
            label: 'Зарегистрироваться',
            color: 'blue',
            type: 'submit',
            events: {
                click: (event: Event) => submitHandler(event, this.children, 'profile'),
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
            placeholder: INPUT_PLACEHOLDERS.email,
            required: true,
            events: {
                focusin: () => (this.children.emailInput as Input).setError(null),
                focusout: () => (this.children.emailInput as Input)
                    .setError(validate((this.children.emailInput as Input).getProps('type'), (this.children.emailInput as Input).getValue())),
            },
        });

        this.children.loginInput = new Input({
            direction: "vertical",
            name: "login",
            label: "Логин",
            type: "text",
            placeholder: INPUT_PLACEHOLDERS.login,
            required: true,
            events: {
                focusin: () => (this.children.loginInput as Input).setError(null),
                focusout: () => (this.children.loginInput as Input)
                    .setError(validate((this.children.loginInput as Input).getProps('type'), (this.children.loginInput as Input).getValue())),
            },
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
            placeholder: INPUT_PLACEHOLDERS.phone,
            required: true,
            events: {
                focusin: () => (this.children.phoneInput as Input).setError(null),
                focusout: () => (this.children.phoneInput as Input)
                    .setError(validate((this.children.phoneInput as Input).getProps('type'), (this.children.phoneInput as Input).getValue())),
            },
        });

        this.children.newPasswordInput = new Input({
            direction: "vertical",
            name: "new_password",
            label: "Пароль",
            type: "password",
            placeholder: INPUT_PLACEHOLDERS.password,
            required: true,
            events: {
                focusin: () => (this.children.newPasswordInput as Input).setError(null),
                focusout: () => (this.children.newPasswordInput as Input)
                    .setError(validate((this.children.newPasswordInput as Input).getProps('type'), (this.children.newPasswordInput as Input).getValue())),
            },
        });

        this.children.repeatPasswordInput = new Input({
            direction: "vertical",
            name: "repeat_password",
            label: "Пароль (еще раз)",
            type: "password",
            placeholder: INPUT_PLACEHOLDERS.password,
            required: true,
            events: {
                focusin: () => (this.children.repeatPasswordInput as Input).setError(null),
                focusout: () => (this.children.repeatPasswordInput as Input)
                    .setError(validate((this.children.repeatPasswordInput as Input).getProps('type'), (this.children.repeatPasswordInput as Input).getValue())),
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
