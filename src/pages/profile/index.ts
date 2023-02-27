import template from './profile.hbs';

import {Button} from '../../components/button';
import {Input, InputType} from '../../components/input';
import {Avatar} from '../../components/avatar';
import {AsideNavigation} from '../../components/asideNavigation';

import Block from '../../utils/Block';
import {renderDOM} from '../../utils/router';

import {INPUTS} from '../../constants/constants';

import avatar from '../../../static/icons/samoyed.png';

interface ProfilePageProps {
    name?: string;
}

type PROFILE_INPUT_TYPE = 'email' | 'login' | 'firstName' | 'secondName' | 'phone' | 'displayName';

const PROFILE_INPUTS = ['email', 'login', 'firstName', 'secondName', 'phone', 'displayName'] as PROFILE_INPUT_TYPE[];

export class ProfilePage extends Block {
    constructor(props: ProfilePageProps) {
        super(props);
        this.props.name = INPUTS['displayName'].placeholder;
    }

    init() {
        this.children.asideNavigation = new AsideNavigation({
            events: {
                click: () => renderDOM('chats'),
            }
        });

        this.children.avatar = new Avatar({
            image: avatar,
            size: 'large',
            canUpdate: true,
            onChangeAvatar: (file: File) => console.log(file)
        });

        this.children.changeInfoButton = new Button({
            label: 'Изменить данные',
            color: 'transparent-blue',
            type: 'button',
            events: {
                click: () => renderDOM('changeInfo'),
            },
        });

        this.children.changePasswordButton = new Button({
            label: 'Изменить пароль',
            color: 'transparent-blue',
            type: 'button',
            events: {
                click: () => renderDOM('changePassword'),
            },
        });

        this.children.signOutButton = new Button({
            label: 'Выйти',
            color: 'transparent-red',
            type: 'button',
            events: {
                click: () => renderDOM('signUp'),
            },
        });

        this.children.inputs = PROFILE_INPUTS.map((input: PROFILE_INPUT_TYPE) => new Input({
            direction: 'horizontal',
            name: INPUTS[input].name,
            label: INPUTS[input].label,
            type: INPUTS[input].type as InputType,
            value: INPUTS[input].placeholder,
            disabled: true
        }));
    }

    render() {
        return this.compile(template, this.props);
    }
}
