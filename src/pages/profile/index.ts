import template from './profile.hbs';

import {Button} from '../../components/button';
import {Input, InputType} from '../../components/input';
import {Avatar} from '../../components/avatar';
import {AsideNavigation} from '../../components/asideNavigation';

import Block from '../../utils/Block';

import {INPUTS} from '../../constants/constants';
import {withStore} from '../../utils/Store';
import {User} from '../../api/AuthAPI';

import avatar from '../../../static/icons/samoyed.png';
import Router from '../../utils/Router';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';

interface ProfilePageProps extends User {}

const PROFILE_INPUTS = [
    'first_name',
    'second_name',
    'display_name',
    'login',
    'email',
    'phone'
] as Array<keyof ProfilePageProps>;

class ProfilePageBase extends Block<ProfilePageProps> {
    init() {
        this.children.asideNavigation = new AsideNavigation({
            events: {
                click: () => Router.go('/chats'),
            }
        });

        this.children.avatar = new Avatar({
            image: this.props['avatar'] ?? avatar,
            size: 'large',
            canUpdate: true,
            events: {
                onChangeAvatar: (file: File) => UserController.updateAvatar({ avatar: file })
            }
        });

        this.children.changeInfoButton = new Button({
            label: 'Изменить данные',
            color: 'transparent-blue',
            type: 'button',
            events: {
                click: () => Router.go('/changeInfo'),
            },
        });

        this.children.changePasswordButton = new Button({
            label: 'Изменить пароль',
            color: 'transparent-blue',
            type: 'button',
            events: {
                click: () => Router.go('/changePassword'),
            },
        });

        this.children.signOutButton = new Button({
            label: 'Выйти',
            color: 'transparent-red',
            type: 'button',
            events: {
                click: () => AuthController.logout(),
            },
        });

        this.children.inputs = PROFILE_INPUTS.map(input => new Input({
            direction: 'horizontal',
            name: INPUTS[input].name,
            label: INPUTS[input].label,
            type: INPUTS[input].type as InputType,
            value: this.props[input],
            disabled: true
        }));
    }

    protected componentDidUpdate(_oldProps: ProfilePageProps, newProps: ProfilePageProps): boolean {
        (this.children.avatar as Avatar).setProps({ image: newProps['avatar'] ?? avatar });
        return false;
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const ProfilePage = withStore((state) => {
    return state.user || {};
})(ProfilePageBase);
