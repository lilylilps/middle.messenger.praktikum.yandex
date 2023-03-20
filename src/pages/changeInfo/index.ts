import template from './changeInfo.hbs';

import {ChangeProfileData} from '../../api/UserAPI';
import {RESOURCE_URL} from '../../api/ResourceAPI';

import {Button} from '../../components/button';
import {Input, InputType} from '../../components/input';
import {Avatar} from '../../components/avatar';
import {AsideNavigation} from '../../components/asideNavigation';
import {Toaster} from '../../components/toaster';

import Block from '../../utils/Block';
import {submitHandler} from '../../utils/submitHandler';
import {validateInput} from '../../utils/validator';
import Router from '../../utils/router';
import {withStore} from '../../utils/Store';
import {logFormData} from '../../utils/formDataLogger';

import UserController from '../../controllers/UserController';

import {INPUTS} from '../../constants/constants';
import {User} from '../../models/user';

import avatar from '../../../static/icons/samoyed.png';

interface ChangeInfoPageProps extends User {}

export class ChangeInfoPageBase extends Block<ChangeInfoPageProps> {
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

        this.children.emailInput = new Input({
            direction: 'horizontal',
            name: INPUTS['email'].name,
            label: INPUTS['email'].label,
            type: INPUTS['email'].type as InputType,
            value: this.props['email'],
            required: true,
            events: {
                focusin: () => (this.children.emailInput as Input).setError(null),
                focusout: () => (this.children.emailInput as Input)
                    .setError(validateInput((this.children.emailInput as Input).getName(),
                        (this.children.emailInput as Input).getValue()
                    )),
            },
        });

        this.children.loginInput = new Input({
            direction: 'horizontal',
            name: INPUTS['login'].name,
            label: INPUTS['login'].label,
            type: INPUTS['login'].type as InputType,
            value: this.props['login'],
            required: true,
            events: {
                focusin: () => (this.children.loginInput as Input).setError(null),
                focusout: () => (this.children.loginInput as Input)
                    .setError(validateInput((this.children.loginInput as Input).getName(),
                        (this.children.loginInput as Input).getValue()
                    )),
            },
        });

        this.children.firstNameInput = new Input({
            direction: 'horizontal',
            name: INPUTS['first_name'].name,
            label: INPUTS['first_name'].label,
            type: INPUTS['first_name'].type as InputType,
            value: this.props['first_name'],
            required: true,
            events: {
                focusin: () => (this.children.firstNameInput as Input).setError(null),
                focusout: () => (this.children.firstNameInput as Input)
                    .setError(validateInput((this.children.firstNameInput as Input).getName(),
                        (this.children.firstNameInput as Input).getValue()
                    )),
            },
        });

        this.children.secondNameInput = new Input({
            direction: 'horizontal',
            name: INPUTS['second_name'].name,
            label: INPUTS['second_name'].label,
            type: INPUTS['second_name'].type as InputType,
            value: this.props['second_name'],
            required: true,
            events: {
                focusin: () => (this.children.secondNameInput as Input).setError(null),
                focusout: () => (this.children.secondNameInput as Input)
                    .setError(validateInput((this.children.secondNameInput as Input).getName(),
                        (this.children.secondNameInput as Input).getValue()
                    )),
            },
        });

        this.children.phoneInput = new Input({
            direction: 'horizontal',
            name: INPUTS['phone'].name,
            label: INPUTS['phone'].label,
            type: INPUTS['phone'].type as InputType,
            value: this.props['phone'],
            required: true,
            events: {
                focusin: () => (this.children.phoneInput as Input).setError(null),
                focusout: () => (this.children.phoneInput as Input)
                    .setError(validateInput((this.children.phoneInput as Input).getName(),
                        (this.children.phoneInput as Input).getValue()
                    )),
            },
        });

        this.children.displayNameInput = new Input({
            direction: 'horizontal',
            name: INPUTS['display_name'].name,
            label: INPUTS['display_name'].label,
            type: INPUTS['display_name'].type as InputType,
            value: this.props['display_name'],
            required: true,
            events: {
                focusin: () => (this.children.displayNameInput as Input).setError(null),
                focusout: () => (this.children.displayNameInput as Input)
                    .setError(validateInput((this.children.displayNameInput as Input).getName(),
                        (this.children.displayNameInput as Input).getValue()
                    )),
            },
        });

        this.children.errorToaster = new Toaster({});
        (this.children.errorToaster as Block).hide();
    }

    onSubmit(event: Event, data: Block['children']): void {
        const isValidForm = submitHandler(event, data);

        if (isValidForm) {
            UserController.updateProfile(logFormData(data) as ChangeProfileData);
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const ChangeInfoPage = withStore((state) => {
    return state.user || {};
})(ChangeInfoPageBase);
