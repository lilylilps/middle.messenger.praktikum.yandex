import template from './profile.hbs';

import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {Avatar} from '../../components/avatar';

import Block from '../../utils/Block';
import {renderDOM} from '../../utils/router';
import avatar from '../../../static/icons/samoyed.png';

const INPUT_VALUES = {
    email: 'ivanivanov@yandex.ru',
    login: 'ivanivanov',
    firstName: 'Иван',
    secondName: 'Иванов',
    phone: '+79995555555',
    displayName: 'Иван'
}

interface ProfilePageProps {
    name?: string;
}

export class ProfilePage extends Block {
    constructor(props: ProfilePageProps) {
        super(props);
        this.props.name = INPUT_VALUES.displayName;
    }

    init() {
        this.children.avatar = new Avatar({
            image: avatar,
            size: 'large',
            canUpdate: true,
        });

        this.children.changeInfoButton = new Button({
            label: 'Изменить данные',
            color: 'transparent-blue',
            type: 'button',
            events: {
            click: () => renderDOM('changeInfo'),
            },
        });

        this.children.changePasswordButton = new Button({
            label: 'Изменить пароль',
            color: 'transparent-blue',
            type: 'button',
            events: {
            click: () => renderDOM('changePassword'),
            },
        });

        this.children.signOutButton = new Button({
            label: 'Выйти',
            color: 'transparent-red',
            type: 'button',
            events: {
            click: () => renderDOM('signUp'),
            },
        });

        this.children.emailInput = new Input({
            direction: "horizontal",
            name: "email",
            label: "Email",
            type: "email",
            value: INPUT_VALUES.email,
            disabled: true
        });

        this.children.loginInput = new Input({
            direction: "horizontal",
            name: "login",
            label: "Логин",
            type: "text",
            value: INPUT_VALUES.login,
            disabled: true
        });

        this.children.firstNameInput = new Input({
            direction: "horizontal",
            name: "first_name",
            label: "Имя",
            type: "text",
            value: INPUT_VALUES.firstName,
            disabled: true
        });

        this.children.secondNameInput = new Input({
            direction: "horizontal",
            name: "second_name",
            label: "Фамилия",
            type: "text",
            value: INPUT_VALUES.secondName,
            disabled: true
        });

        this.children.phoneInput = new Input({
            direction: "horizontal",
            name: "phone",
            label: "Телефон",
            type: "tel",
            value: INPUT_VALUES.phone,
            disabled: true
        });

        this.children.displayNameInput = new Input({
            direction: "horizontal",
            name: "display_name",
            label: "Имя в чате",
            type: "text",
            value: INPUT_VALUES.displayName,
            disabled: true
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
