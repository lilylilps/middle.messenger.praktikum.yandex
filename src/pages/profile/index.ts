import template from './profile.hbs';

import {RESOURCE_URL} from '../../api/ResourceAPI';

import {Button} from '../../components/button';
import {Input, InputType} from '../../components/input';
import {Avatar} from '../../components/avatar';
import {AsideNavigation} from '../../components/asideNavigation';
import {Toaster} from '../../components/toaster';

import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';

import Block from '../../utils/Block';
import {withStore} from '../../utils/Store';
import Router from '../../utils/router';

import {INPUTS} from '../../constants/constants';

import {User} from '../../models/user';

import avatar from '../../../static/icons/samoyed.png';

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
            image: this.props.avatar && `${RESOURCE_URL}${this.props.avatar}` || avatar,
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
            // @ts-ignore
            name: INPUTS[input].name,
            // @ts-ignore
            label: INPUTS[input].label,
            // @ts-ignore
            type: INPUTS[input].type as InputType,
            value: this.props[input],
            disabled: true
        }));

        this.children.errorToaster = new Toaster({});
        (this.children.errorToaster as Block).hide();
    }

    protected componentDidUpdate(): boolean {
        (this.children.avatar as Avatar).setProps({
            image: this.props.avatar && `${RESOURCE_URL}${this.props.avatar}` || avatar
        });
        return true;
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const ProfilePage = withStore((state) => {
    return state.user || {};
})(ProfilePageBase);
