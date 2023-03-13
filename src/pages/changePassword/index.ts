import template from './changePassword.hbs';

import {Button} from '../../components/button';
import {Input, InputType} from '../../components/input';
import {Avatar} from '../../components/avatar';
import {AsideNavigation} from '../../components/asideNavigation';
import {ChangePasswordData} from '../../api/UserAPI';

import Block from '../../utils/Block';
import {submitHandler} from '../../utils/submitHandler';
import {validateInput} from '../../utils/validator';
import {logFormData} from '../../utils/formDataLogger';

import {INPUTS} from '../../constants/constants';

import avatar from '../../../static/icons/samoyed.png';
import Router from '../../utils/Router';
import UserController from '../../controllers/UserController';

export class ChangePasswordPage extends Block {
    init() {
        this.children.asideNavigation = new AsideNavigation({
            events: {
                click: () => Router.go('/profile'),
            }
        });

        this.children.avatar = new Avatar({
            image: avatar,
            size: 'large',
        });

        this.children.saveButton = new Button({
            label: 'Сохранить',
            color: 'blue',
            type: 'submit',
            events: {
                click: (event: Event) => this.onSubmit(event, this.children),
            },
        });

        this.children.oldPasswordInput = new Input({
            direction: 'horizontal',
            name: 'oldPassword',
            label: 'Старый пароль',
            type: INPUTS['password'].type as InputType,
            placeholder: INPUTS['password'].placeholder,
            required: true,
            events: {
                focusin: () => (this.children.oldPasswordInput as Input).setError(null),
                focusout: () => (this.children.oldPasswordInput as Input)
                    .setError(validateInput((this.children.oldPasswordInput as Input).getName(),
                        (this.children.oldPasswordInput as Input).getValue()
                    )),
            },
        });

        this.children.newPasswordInput = new Input({
            direction: 'horizontal',
            name: 'newPassword',
            label: 'Новый пароль',
            type: INPUTS['password'].type as InputType,
            placeholder: INPUTS['password'].placeholder,
            required: true,
            events: {
                focusin: () => (this.children.newPasswordInput as Input).setError(null),
                focusout: () => (this.children.newPasswordInput as Input)
                    .setError(validateInput((this.children.newPasswordInput as Input).getName(),
                        (this.children.newPasswordInput as Input).getValue()
                    )),
            },
        });

        this.children.repeatPasswordInput = new Input({
            direction: 'horizontal',
            name: 'repeat_password',
            label: 'Повторите новый пароль',
            type: INPUTS['password'].type as InputType,
            placeholder: INPUTS['password'].placeholder,
            required: true,
            events: {
                focusin: () => (this.children.repeatPasswordInput as Input).setError(null),
                focusout: () => (this.children.repeatPasswordInput as Input)
                    .setError(validateInput(
                        (this.children.repeatPasswordInput as Input).getName(),
                        (this.children.repeatPasswordInput as Input).getValue()
                    )),
            },
        });
    }

    onSubmit(event: Event, data: Block['children']) {
        const isValidForm = submitHandler(event, data);

        if (isValidForm) {
            UserController.updatePassword(logFormData(data) as ChangePasswordData);
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}
