import template from './changeInfo.hbs';

import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {Avatar} from '../../components/avatar';

import Block from '../../utils/Block';
import {submitHandler} from '../../utils/submitHandler';
import {validate} from '../../utils/validator';
import avatar from '../../../static/icons/samoyed.png';

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
        this.children.avatar = new Avatar({
            image: avatar,
            size: 'large',
            canUpdate: true,
        });

        this.children.saveButton = new Button({
            label: 'Сохранить',
            color: 'blue',
            type: 'button',
            events: {
                click: (event: Event) => submitHandler(event, this.children, 'profile'),
            },
        });

        this.children.emailInput = new Input({
            direction: "horizontal",
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
            direction: "horizontal",
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
            placeholder: INPUT_PLACEHOLDERS.phone,
            required: true,
            events: {
                focusin: () => (this.children.phoneInput as Input).setError(null),
                focusout: () => (this.children.phoneInput as Input)
                    .setError(validate((this.children.phoneInput as Input).getProps('type'), (this.children.phoneInput as Input).getValue())),
            },
        });

        this.children.displayNameInput = new Input({
            direction: "horizontal",
            name: "display_name",
            label: "Имя в чате",
            type: "text",
            placeholder: INPUT_PLACEHOLDERS.displayName
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
