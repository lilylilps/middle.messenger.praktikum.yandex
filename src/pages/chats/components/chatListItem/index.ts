import template from './chatListItem.hbs';

import {Avatar} from '../../../../components/avatar';

import Block from '../../../../utils/Block';

interface ChatListItemProps {
    id: number;
    image: string;
    name: string;
    text: string;
    time: string;
    count: number;
    events: {
        onChatSelect: (id: number) => void;
    }
}

export class ChatListItem extends Block {
    constructor(props: ChatListItemProps) {
        const expandedProps = {...props, events: {
            ...props.events,
            click: () => this.props.events.onChatSelect(this.props.id)
        }};
        super(expandedProps);
    }

    init() {
        this.children.avatar = new Avatar({
            image: this.props.image,
            size: 'medium',
        });
    }

    render() {
        return this.compile(template, this.props);
    }

    getId(): number {
        return this.props.id;
    }

    select(): void {
        this.element?.classList.add('chat-item-selected');
    }

    unselect(): void {
        this.element?.classList.remove('chat-item-selected');
    }
}
