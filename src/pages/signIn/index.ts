import template from './signIn.hbs';

import {Button} from '../../components/button';
import {Input, InputType} from '../../components/input';

import Block from '../../utils/Block';
import {renderDOM} from '../../utils/router';
import {submitHandler} from '../../utils/submitHandler';
import {validateInput} from '../../utils/validator';

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
            name: INPUTS['firstName'].name,
            label: INPUTS['firstName'].label,
            type: INPUTS['firstName'].type as InputType,
            placeholder: INPUTS['firstName'].placeholder,
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
            name: INPUTS['secondName'].name,
            label: INPUTS['secondName'].label,
            type: INPUTS['secondName'].type as InputType,
            placeholder: INPUTS['secondName'].placeholder,
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
            name: 'new_password',
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
    }

    render() {
        return this.compile(template, this.props);
    }
}
