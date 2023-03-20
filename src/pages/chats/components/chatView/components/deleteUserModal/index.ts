import template from './deleteUserModal.hbs';

import {ChatUserList} from './chatUserList';

import {Button} from '../../../../../../components/button';
import {Input} from '../../../../../../components/input';
import {ButtonWithIcon} from '../../../../../../components/buttonWithIcon';

import Block from '../../../../../../utils/Block';

import {User} from '../../../../../../models/user';

import closeIcon from '../../../../../../../static/icons/close.svg';

interface DeleteUserModalProps {
    events: {
        onUserDelete: (user: User) => void
    }
}

export class DeleteUserModal extends Block<DeleteUserModalProps> {
    private userToDelete: User | undefined = undefined;

    constructor(props: DeleteUserModalProps) {
        super(props);
    }

    init() {
        this.children.userLoginInput = new Input({
            direction: 'vertical',
            label: '',
            name: 'userLogin',
            type: 'text',
            placeholder: 'Выберите пользователя'
        });

        this.children.chatUserList = new ChatUserList({
            events: {
                onUserSelect: (user: User) => {
                    (this.children.chatUserList as Block).hide();
                    (this.children.userLoginInput as Input).setProps({ value: user.login });
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
                    const input = (this.children.userLoginInput as Input);
                    const userName = input.getValue();

                    if (!userName) {
                        input.setError('Укажите имя пользователя');
                    } else {
                        this.props.events.onUserDelete(this.userToDelete!);
                        input.clear();
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
                click: () => {
                    const input = (this.children.userLoginInput as Input);
                    input.clear();
                    this.hide();
                }
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
