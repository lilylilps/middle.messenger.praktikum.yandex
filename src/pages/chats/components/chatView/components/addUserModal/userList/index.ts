import template from './userList.hbs';

import {Button} from '../../../../../../../components/button';

import Block from '../../../../../../../utils/Block';
import {withStore} from '../../../../../../../utils/Store';

import {User} from '../../../../../../../models/user';

interface UserListProps {
    users: User[];
    events: {
        onUserSelect: (user: User) => void;
    }
}

class UserListBase extends Block<UserListProps> {
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

    render() {
        return this.compile(template, this.props);
    }
}

export const UserList = withStore((state) => ({
    users: [...(state.users || [])],
}))(UserListBase);
