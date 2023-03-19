import template from './chatUserList.hbs';

import {Button} from '../../../../../../../components/button';

import Block from '../../../../../../../utils/Block';
import {withStore} from '../../../../../../../utils/Store';

import {User} from '../../../../../../../models/user';

interface ChatUserListProps {
    users: User[];
    events: {
        onUserSelect: (user: User) => void;
    }
}

class ChatUserListBase extends Block<ChatUserListProps> {
    constructor(props: ChatUserListProps) {
        super(props);
    }

    protected componentDidUpdate(): boolean {        
        this.children.list = this.props.users
            .filter((user: User) => user.role !== 'admin')
            .map((user: User) => new Button({
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

export const ChatUserList = withStore((state) => ({
    users: [...(state.chatUsers || [])],
}))(ChatUserListBase);
