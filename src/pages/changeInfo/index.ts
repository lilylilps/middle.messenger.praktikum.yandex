import template from './changeInfo.hbs';

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
    displayName: 'Иван'
}

export class ChangeInfoPage extends Block {
    init() {
        this.children.saveButton = new Button({
            label: 'Сохранить',
            color: 'blue',
            type: 'button',
            events: {
                click: (event: Event) => {
                    this.onSubmit(event);
                    renderDOM('profile');
                },
            },
        });

        this.children.emailInput = new Input({
            direction: "horizontal",
            name: "email",
            label: "Email",
            type: "email",
            placeholder: INPUT_PLACEHOLDERS.email
        });

        this.children.loginInput = new Input({
            direction: "horizontal",
            name: "login",
            label: "Логин",
            type: "text",
            placeholder: INPUT_PLACEHOLDERS.login
        });

        this.children.firstNameInput = new Input({
            direction: "horizontal",
            name: "first_name",
            label: "Имя",
            type: "text",
            placeholder: INPUT_PLACEHOLDERS.firstName
        });

        this.children.secondNameInput = new Input({
            direction: "horizontal",
            name: "second_name",
            label: "Фамилия",
            type: "text",
            placeholder: INPUT_PLACEHOLDERS.secondName
        });

        this.children.phoneInput = new Input({
            direction: "horizontal",
            name: "phone",
            label: "Телефон",
            type: "tel",
            placeholder: INPUT_PLACEHOLDERS.phone
        });

        this.children.displayNameInput = new Input({
            direction: "horizontal",
            name: "display_name",
            label: "Имя в чате",
            type: "text",
            placeholder: INPUT_PLACEHOLDERS.displayName
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
