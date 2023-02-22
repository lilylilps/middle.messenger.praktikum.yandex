import template from './changePassword.hbs';

import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {Avatar} from '../../components/avatar';

import Block from '../../utils/Block';
import {submitHandler} from '../../utils/submitHandler';
import {validate} from '../../utils/validator';
import avatar from '../../../static/icons/samoyed.png';

const INPUT_PLACEHOLDERS = {
    password: 'не менее 6 символов'
}

export class ChangePasswordPage extends Block {
    init() {
        this.children.avatar = new Avatar({
            image: avatar,
            size: 'large',
        });

        this.children.saveButton = new Button({
            label: 'Сохранить',
            color: 'blue',
            type: 'button',
            events: {
                click: (event: Event) => submitHandler(event, this.children, 'profile'),
            },
        });

        this.children.oldPasswordInput = new Input({
            direction: "horizontal",
            name: "old_password",
            label: "Старый пароль",
            type: "password",
            placeholder: INPUT_PLACEHOLDERS.password,
            required: true,
            events: {
                focusin: () => (this.children.oldPasswordInput as Input).setError(null),
                focusout: () => (this.children.oldPasswordInput as Input)
                    .setError(validate((this.children.oldPasswordInput as Input).getProps('type'), (this.children.oldPasswordInput as Input).getValue())),
            },
        });

        this.children.newPasswordInput = new Input({
            direction: "horizontal",
            name: "new_password",
            label: "Новый пароль",
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
            direction: "horizontal",
            name: "repeat_password",
            label: "Повторите новый пароль",
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
