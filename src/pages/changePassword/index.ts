import template from './changePassword.hbs';

import {Button} from '../../components/Button';
import {Input} from '../../components/Input';

import Block from '../../utils/Block';
import {renderDOM} from '../../utils/router';

const INPUT_PLACEHOLDERS = {
    password: 'не менее 6 символов'
}

export class ChangePasswordPage extends Block {
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

        this.children.oldPasswordInput = new Input({
            direction: "horizontal",
            name: "old_password",
            label: "Старый пароль",
            type: "password",
            placeholder: INPUT_PLACEHOLDERS.password
        });

        this.children.newPasswordInput = new Input({
            direction: "horizontal",
            name: "new_password",
            label: "Новый пароль",
            type: "password",
            placeholder: INPUT_PLACEHOLDERS.password
        });

        this.children.repeatPasswordInput = new Input({
            direction: "horizontal",
            name: "repeat_password",
            label: "Повторите новый пароль",
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
