import template from './addUserModal.hbs';

import {Button} from '../../../../../../components/button';
import {Input} from '../../../../../../components/input';
import {ButtonWithIcon} from '../../../../../../components/buttonWithIcon';

import Block from '../../../../../../utils/Block';
import closeIcon from '../../../../../../../static/icons/close.svg';
import UserController from '../../../../../../controllers/UserController';
import { User } from '../../../../../../api/AuthAPI';
import { UserList } from '../userList';

interface AddUserModalProps {
    usersToAdd: User[];
    events: {
        onUserAdd: (userName: string) => void;
    }
}

export class AddUserModal extends Block {
    constructor(props: AddUserModalProps) {
        super(props);
    }

    init() {
        this.children.userNameInput = new Input({
            direction: 'vertical',
            label: 'Имя',
            name: 'userName',
            type: 'text',
            placeholder: 'Имя пользователя',
            events: {
                keyup: this.debounce(() =>
                    UserController.getUser((this.children.userNameInput as Input).getValue()), 1000
                )
            }
        });

        this.children.userList = new UserList({});

        this.children.addButton = new Button({
            label: 'Добавить',
            color: 'blue',
            type: 'submit',
            events: {
                click: () => {
                    const input = (this.children.userNameInput as Input);
                    const userName = input.getValue();

                    if (!userName) {
                        input.setError('Укажите имя пользователя');
                    } else {
                        this.props.events.onUserAdd(userName);
                        this.hide();
                    }
                }
            }
        });

        this.children.closeButton = new ButtonWithIcon({
            color: 'transparent-grey',
            type: 'button',
            icon: closeIcon,
            size: 'small',
            alt: 'Close',
            events: {
                click: () => this.hide()
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }


    // вынести 
    debounce(callback: () => void, wait: number | undefined) {
        let timer = 0;

        return function(...args: any) {
            clearTimeout(timer);
            timer = setTimeout(callback.bind(this, ...args), wait || 0);
        };
    }
}
