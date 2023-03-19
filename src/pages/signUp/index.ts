import template from './signUp.hbs';

import {SignupData} from '../../api/AuthAPI';

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

export class SignUpPage extends Block {
    init() {
        this.children.registerButton = new Button({
            label: 'Зарегистрироваться',
            color: 'blue',
            type: 'submit',
            events: {
                click: (event: Event) => this.onSubmit(event, this.children),
            },
        });

        this.children.enterButton = new Button({
            label: 'Войти',
            color: 'transparent-blue',
            type: 'button',
            events: {
            click: () => Router.go('/'),
            },
        });

        this.children.emailInput = new Input({
            direction: 'vertical',
            name: INPUTS['email'].name,
            label: INPUTS['email'].label,
            type: INPUTS['email'].type as InputType,
            placeholder: INPUTS['email'].placeholder,
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
            direction: 'vertical',
            name: INPUTS['login'].name,
            label: INPUTS['login'].label,
            type: INPUTS['login'].type as InputType,
            placeholder: INPUTS['login'].placeholder,
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
            direction: 'vertical',
            name: INPUTS['first_name'].name,
            label: INPUTS['first_name'].label,
            type: INPUTS['first_name'].type as InputType,
            placeholder: INPUTS['first_name'].placeholder,
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
            direction: 'vertical',
            name: INPUTS['second_name'].name,
            label: INPUTS['second_name'].label,
            type: INPUTS['second_name'].type as InputType,
            placeholder: INPUTS['second_name'].placeholder,
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
            direction: 'vertical',
            name: INPUTS['phone'].name,
            label: INPUTS['phone'].label,
            type: INPUTS['phone'].type as InputType,
            placeholder: INPUTS['phone'].placeholder,
            required: true,
            events: {
                focusin: () => (this.children.phoneInput as Input).setError(null),
                focusout: () => (this.children.phoneInput as Input)
                    .setError(validateInput((this.children.phoneInput as Input).getName(),
                        (this.children.phoneInput as Input).getValue()
                    )),
            },
        });

        this.children.newPasswordInput = new Input({
            direction: 'vertical',
            name: 'password',
            label: INPUTS['password'].label,
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
            direction: 'vertical',
            name: 'repeat_password',
            label: 'Пароль (еще раз)',
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
    
    onSubmit(event: Event, data: Block['children']) {
        const isValidForm = submitHandler(event, data);

        const isEqualPasswords = this.checkPassword(
            (this.children.newPasswordInput as Input).getValue(),
            (this.children.repeatPasswordInput as Input).getValue()
        );

        if (!isEqualPasswords) {
            (this.children.newPasswordInput as Input).setError('Пароли не совпадают');
            (this.children.repeatPasswordInput as Input).setError('Пароли не совпадают');
        }

        if (isValidForm && isEqualPasswords) {
            AuthController.signup(logFormData(data) as SignupData);
        }
    }

    render() {
        return this.compile(template, this.props);
    }

    private checkPassword(lhs: string, rhs: string): boolean {
        return lhs === rhs;
    }
}
