import template from './signIn.hbs';

import {Button} from '../../components/button';
import {Input, InputType} from '../../components/input';

import Block from '../../utils/Block';
import {renderDOM} from '../../utils/router';
import {submitHandler} from '../../utils/submitHandler';
import {validate} from '../../utils/validator';

import {INPUTS} from '../../constants/constants';

export class SignInPage extends Block {
    init() {
        this.children.registerButton = new Button({
            label: 'Зарегистрироваться',
            color: 'blue',
            type: 'submit',
            events: {
                click: (event: Event) => submitHandler(event, this.children, 'chats'),
            },
        });

        this.children.enterButton = new Button({
            label: 'Войти',
            color: 'transparent-blue',
            type: 'button',
            events: {
            click: () => renderDOM('signUp'),
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
                    .setError(validate((this.children.emailInput as Input).getProps('type'),
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
                    .setError(validate((this.children.loginInput as Input).getProps('type'),
                        (this.children.loginInput as Input).getValue()
                    )),
            },
        });

        this.children.firstNameInput = new Input({
            direction: 'vertical',
            name: INPUTS['firstName'].name,
            label: INPUTS['firstName'].label,
            type: INPUTS['firstName'].type as InputType,
            placeholder: INPUTS['firstName'].placeholder,
        });

        this.children.secondNameInput = new Input({
            direction: 'vertical',
            name: INPUTS['secondName'].name,
            label: INPUTS['secondName'].label,
            type: INPUTS['secondName'].type as InputType,
            placeholder: INPUTS['secondName'].placeholder,
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
                    .setError(validate((this.children.phoneInput as Input).getProps('type'),
                        (this.children.phoneInput as Input).getValue()
                    )),
            },
        });

        this.children.newPasswordInput = new Input({
            direction: 'vertical',
            name: 'newPassword',
            label: INPUTS['password'].label,
            type: INPUTS['password'].type as InputType,
            placeholder: INPUTS['password'].placeholder,
            required: true,
            events: {
                focusin: () => (this.children.newPasswordInput as Input).setError(null),
                focusout: () => (this.children.newPasswordInput as Input)
                    .setError(validate((this.children.newPasswordInput as Input).getProps('type'),
                        (this.children.newPasswordInput as Input).getValue()
                    )),
            },
        });

        this.children.repeatPasswordInput = new Input({
            direction: 'vertical',
            name: 'repeatPassword',
            label: 'Пароль (еще раз)',
            type: INPUTS['password'].type as InputType,
            placeholder: INPUTS['password'].placeholder,
            required: true,
            events: {
                focusin: () => (this.children.repeatPasswordInput as Input).setError(null),
                focusout: () => (this.children.repeatPasswordInput as Input)
                    .setError(validate(
                        (this.children.repeatPasswordInput as Input).getProps('type'),
                        (this.children.repeatPasswordInput as Input).getValue()
                    )),
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
