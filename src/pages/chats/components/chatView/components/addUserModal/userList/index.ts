import template from './userList.hbs';

import Block from '../../../../../../../utils/Block';
import { withStore } from '../../../../../../../utils/Store';
import { User } from '../../../../../../../api/AuthAPI';
import { Button } from '../../../../../../../components/button';

interface UserListProps {
    users?: User[];
    events: {
        onUserSelect: (user: User) => void;
    }
}

class UserListBase extends Block {
    constructor(props: UserListProps) {
        super(props);
    }

    protected componentDidUpdate(_oldProps: any, _newProps: any): boolean {
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
