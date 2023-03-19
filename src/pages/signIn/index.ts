import template from './signIn.hbs';

import {SigninData} from '../../api/AuthAPI';

import {Button} from '../../components/button';
import {Input, InputType} from '../../components/input';
import {Toaster} from '../../components/toaster';

import AuthController from '../../controllers/AuthController';

import Block from '../../utils/Block';
import {submitHandler} from '../../utils/submitHandler';
import {validateInput} from '../../utils/validator';
import Router from '../../utils/Router';
import {logFormData} from '../../utils/formDataLogger';

import {INPUTS} from '../../constants/constants';

export class SignInPage extends Block {
    init() {
        this.children.enterButton = new Button({
            label: 'Вход',
            color: 'blue',
            type: 'submit',
            events: {
                click: (event: Event) => this.onSubmit(event, this.children),
            },
        });

        this.children.registerButton = new Button({
            label: 'Нет аккаунта?',
            color: 'transparent-blue',
            type: 'button',
            events: {
                click: () => Router.go('/signUp'),
            },
        });

        this.children.loginInput = new Input({
            direction: 'vertical',
            name: INPUTS['login'].name,
            label: INPUTS['login'].label,
            type: INPUTS['login'].type as InputType,
            placeholder:INPUTS['login'].placeholder,
            required: true,
            events: {
                focusin: () => (this.children.loginInput as Input).setError(null),
                focusout: () => (this.children.loginInput as Input)
                    .setError(validateInput((this.children.loginInput as Input).getName(),
                        (this.children.loginInput as Input).getValue()
                    )),
            },
        });

        this.children.passwordInput = new Input({
            direction: 'vertical',
            name: INPUTS['password'].name,
            label: INPUTS['password'].label,
            type: INPUTS['password'].type as InputType,
            placeholder:INPUTS['password'].placeholder,
            required: true,
            events: {
                focusin: () => (this.children.passwordInput as Input).setError(null),
                focusout: () => (this.children.passwordInput as Input)
                    .setError(validateInput((this.children.passwordInput as Input).getName(),
                        (this.children.passwordInput as Input).getValue()
                    )),
            },
        });

        this.children.errorToaster = new Toaster({});
        (this.children.errorToaster as Block).hide();
    }

    onSubmit(event: Event, data: Block['children']): void {
        const isValidForm = submitHandler(event, data);

        if (isValidForm) {
            AuthController.signin(logFormData(data) as SigninData);
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}
