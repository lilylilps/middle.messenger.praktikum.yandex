import template from './changePassword.hbs';

import {ChangePasswordData} from '../../api/UserAPI';
import {RESOURCE_URL} from '../../api/ResourceAPI';

import {Button} from '../../components/button';
import {Input, InputType} from '../../components/input';
import {Avatar} from '../../components/avatar';
import {AsideNavigation} from '../../components/asideNavigation';
import {Toaster} from '../../components/toaster';

import Block from '../../utils/Block';
import {submitHandler} from '../../utils/submitHandler';
import {validateInput} from '../../utils/validator';
import {logFormData} from '../../utils/formDataLogger';
import Router from '../../utils/Router';
import {withStore} from '../../utils/Store';

import UserController from '../../controllers/UserController';

import {INPUTS} from '../../constants/constants';

import {User} from '../../models/user';

import avatar from '../../../static/icons/samoyed.png';

interface ChangeParrwordPageProps extends User {}

class ChangePasswordPageBase extends Block<ChangeParrwordPageProps> {
    init() {
        this.children.asideNavigation = new AsideNavigation({
            events: {
                click: () => Router.go('/profile'),
            }
        });

        this.children.avatar = new Avatar({
            image: this.props.avatar && `${RESOURCE_URL}${this.props.avatar}` || avatar,
            size: 'large',
            canUpdate: false,
            events: {
                onChangeAvatar: () => {}
            }
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

        this.children.errorToaster = new Toaster({});
        (this.children.errorToaster as Block).hide();
    }

    onSubmit(event: Event, data: Block['children']): void {
        const isValidForm = submitHandler(event, data);

        const isEqualPasswords = this.checkPassword(
            (this.children.oldPasswordInput as Input).getValue(),
            (this.children.newPasswordInput as Input).getValue()
        );

        if (isEqualPasswords) {
            (this.children.oldPasswordInput as Input).setError('Старый и новый пароли совпадают');
        }

        const isEqualNewPasswords = this.checkPassword(
            (this.children.newPasswordInput as Input).getValue(),
            (this.children.repeatPasswordInput as Input).getValue()
        );

        if (!isEqualNewPasswords) {
            (this.children.newPasswordInput as Input).setError('Пароли не совпадают');
            (this.children.repeatPasswordInput as Input).setError('Пароли не совпадают');
        }

        if (isValidForm && isEqualNewPasswords && !isEqualPasswords) {
            UserController.updatePassword(logFormData(data) as ChangePasswordData);
        }
    }

    render() {
        return this.compile(template, this.props);
    }

    private checkPassword(lhs: string, rhs: string): boolean {
        return lhs === rhs;
    }
}

export const ChangePasswordPage = withStore((state) => {
    return state.user || {};
})(ChangePasswordPageBase);
