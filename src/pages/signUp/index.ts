import template from './signUp.hbs';

import {Button} from '../../components/button';
import {Input, InputType} from '../../components/input';

import Block from '../../utils/Block';
import {renderDOM} from '../../utils/router';
import {submitHandler} from '../../utils/submitHandler';
import {validate} from '../../utils/validator';
import {INPUTS} from '../../constants/constants';

export class SignUpPage extends Block {
    init() {
        this.children.enterButton = new Button({
            label: 'Вход',
            color: 'blue',
            type: 'submit',
            events: {
                click: (event: Event) => submitHandler(event, this.children, 'chats'),
            },
        });

        this.children.registerButton = new Button({
            label: 'Нет аккаунта?',
            color: 'transparent-blue',
            type: 'button',
            events: {
                click: () => renderDOM('signIn'),
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
                    .setError(validate((this.children.loginInput as Input).getProps('type'),
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
                    .setError(validate((this.children.passwordInput as Input).getProps('type'),
                        (this.children.passwordInput as Input).getValue()
                    )),
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
