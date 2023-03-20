import template from './addUserModal.hbs';

import {UserList} from './userList';

import {Button} from '../../../../../../components/button';
import {Input} from '../../../../../../components/input';
import {ButtonWithIcon} from '../../../../../../components/buttonWithIcon';

import Block from '../../../../../../utils/Block';
import {debounce} from '../../../../../../utils/debounce';

import {User} from '../../../../../../models/user';

import UserController from '../../../../../../controllers/UserController';

import closeIcon from '../../../../../../../static/icons/close.svg';

interface AddUserModalProps {
    events: {
        onUserAdd: (user: User) => void;
    }
}

export class AddUserModal extends Block<AddUserModalProps> {
    private userToAdd: User | undefined = undefined;

    constructor(props: AddUserModalProps) {
        super(props);
    }

    init() {
        this.children.userLoginInput = new Input({
            direction: 'vertical',
            label: 'Логин',
            name: 'userLogin',
            type: 'text',
            placeholder: 'Логин пользователя',
            events: {
                keyup: debounce(() =>
                    UserController.getAllUsers((this.children.userLoginInput as Input).getValue()), 1000
                )
            }
        });

        this.children.userList = new UserList({
            events: {
                onUserSelect: (user: User) => {
                    (this.children.userList as Block).hide();
                    (this.children.userLoginInput as Input).setProps({ value: user.login });
                    this.userToAdd = {...user};
                }
            }
        });

        (this.children.userList as Block).hide();

        this.children.addButton = new Button({
            label: 'Добавить',
            color: 'blue',
            type: 'submit',
            events: {
                click: () => {
                    const input = (this.children.userLoginInput as Input);
                    const userName = input.getValue();

                    if (!userName) {
                        input.setError('Укажите имя пользователя');
                    } else {
                        this.props.events.onUserAdd(this.userToAdd!);
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
