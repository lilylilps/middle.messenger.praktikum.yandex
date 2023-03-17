import template from './deleteUserModal.hbs';

import {Button} from '../../../../../../components/button';
import {Input} from '../../../../../../components/input';
import {ButtonWithIcon} from '../../../../../../components/buttonWithIcon';

import Block from '../../../../../../utils/Block';
import closeIcon from '../../../../../../../static/icons/close.svg';
import { ChatUserList } from './chatUserList';
import { User } from '../../../../../../api/AuthAPI';

interface DeleteUserModalProps {
    events: {
        onUserDelete: (user: User) => void
    }
}

export class DeleteUserModal extends Block {
    private userToDelete = {};

    constructor(props: DeleteUserModalProps) {
        super(props);
    }

    init() {
        this.children.userNameInput = new Input({
            direction: 'vertical',
            label: 'Имя',
            name: 'user_name',
            type: 'text',
            placeholder: 'Имя пользователя'
        });

        this.children.chatUserList = new ChatUserList({
            events: {
                onUserSelect: (user: User) => {
                    (this.children.chatUserList as Block).hide();
                    (this.children.userNameInput as Input).setProps({ value: user.login });
                    this.userToDelete = {...user};
                }
            }
        });

        this.children.confirmButton = new Button({
            label: 'Удалить',
            color: 'red',
            type: 'submit',
            events: {
                click: () => {
                    const input = (this.children.userNameInput as Input);
                    const userName = input.getValue();

                    if (!userName) {
                        input.setError('Укажите имя пользователя');
                    } else {
                        this.props.events.onUserDelete(this.userToDelete);
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
}
