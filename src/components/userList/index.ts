import template from './userList.hbs';

import {Button} from '../button';

import Block from '../../utils/Block';

import {User} from '../../models/user';

interface UserListProps {
    users: User[];
    events: {
        onUserSelect: (user: User) => void;
    }
}

export class UserList extends Block<UserListProps> {
    constructor(props: UserListProps) {
        super(props);
    }

    protected componentDidUpdate(): boolean {
        if (this.props.users && this.props.users.length) {
            this.show('flex');
        }
        
        this.children.list = this.props.users.map((user: User) => new Button({
            label: user.login,
            color: 'transparent-blue',
            type: 'button',
            events: {
                click: () => {
                    this.props.users = [];
                    this.props.events.onUserSelect(user);
                }
            }
        }));

        return true;
    }

    updateUsers(users: User[]): void {
        this.props.users = users ? [...users] : [];
    }

    render() {
        return this.compile(template, this.props);
    }
}
