import template from './changeInfo.hbs';

import {Button} from '../../components/button';
import {Input, InputType} from '../../components/input';
import {Avatar} from '../../components/avatar';
import {AsideNavigation} from '../../components/asideNavigation';

import Block from '../../utils/Block';
import {renderDOM} from '../../utils/router';
import {submitHandler} from '../../utils/submitHandler';
import {validateInput} from '../../utils/validator';

import {INPUTS} from '../../constants/constants';

import avatar from '../../../static/icons/samoyed.png';

export class ChangeInfoPage extends Block {
    init() {
        this.children.asideNavigation = new AsideNavigation({
            events: {
                click: () => renderDOM('profile'),
            }
        });

        this.children.avatar = new Avatar({
            image: avatar,
            size: 'large',
            canUpdate: true,
            onChangeAvatar: (file: File) => console.log(file)
        });

        this.children.saveButton = new Button({
            label: 'Сохранить',
            color: 'blue',
            type: 'submit',
            events: {
                click: (event: Event) => submitHandler(event, this.children, 'profile'),
            },
        });

        this.children.emailInput = new Input({
            direction: 'horizontal',
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
            direction: 'horizontal',
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
            direction: 'horizontal',
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
            direction: 'horizontal',
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
            direction: 'horizontal',
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

        this.children.displayNameInput = new Input({
            direction: 'horizontal',
            name: INPUTS['displayName'].name,
            label: INPUTS['displayName'].label,
            type: INPUTS['displayName'].type as InputType,
            placeholder: INPUTS['displayName'].placeholder,
            required: true,
            events: {
                focusin: () => (this.children.displayNameInput as Input).setError(null),
                focusout: () => (this.children.displayNameInput as Input)
                    .setError(validateInput((this.children.displayNameInput as Input).getName(),
                        (this.children.displayNameInput as Input).getValue()
                    )),
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
