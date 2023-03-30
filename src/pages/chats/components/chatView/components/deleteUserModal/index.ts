import template from './deleteUserModal.hbs';

import {Button} from '../../../../../../components/button';
import {Input} from '../../../../../../components/input';
import {ButtonWithIcon} from '../../../../../../components/buttonWithIcon';
import {UserList} from '../../../../../../components/userList';

import Block from '../../../../../../utils/Block';
import {withStore} from '../../../../../../utils/Store';

import {User} from '../../../../../../models/user';

import closeIcon from '../../../../../../../static/icons/close.svg';

interface DeleteUserModalProps {
    users: User[],
    currentUser: User,
    events: {
        onUserDelete: (user: User) => void
    }
}

class DeleteUserModalBase extends Block<DeleteUserModalProps> {
    private userToDelete?: User;

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

        this.children.chatUserList = new UserList({
            users: this.props.users,
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

    protected componentDidUpdate() {
        (this.children.chatUserList as UserList)
            .updateUsers(this.props.users?.filter(user => user.id !== this.props.currentUser.id));
        return false;
    }
}

export const DeleteUserModal = withStore((state) => ({
    users: [...(state.chatUsers || [])],
    currentUser: state.user,
}))(DeleteUserModalBase);
