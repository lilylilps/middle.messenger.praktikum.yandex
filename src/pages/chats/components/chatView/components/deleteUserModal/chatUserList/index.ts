import template from './chatUserList.hbs';

import Block from '../../../../../../../utils/Block';
import { withStore } from '../../../../../../../utils/Store';
import { User } from '../../../../../../../api/AuthAPI';
import { Button } from '../../../../../../../components/button';

interface ChatUserListProps {
    users?: User[];
    events: {
        onUserSelect: (user: User) => void;
    }
}

class ChatUserListBase extends Block {
    constructor(props: ChatUserListProps) {
        super(props);
    }

    protected componentDidUpdate(_oldProps: any, _newProps: any): boolean {        
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

export const ChatUserList = withStore((state) => ({
    users: [...(state.chatUsers || [])],
}))(ChatUserListBase);
