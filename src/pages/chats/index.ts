import template from './chats.hbs';

import {ChatListItem} from './components/chatListItem';
import {ChatView} from './components/chatView';
import {Button} from '../../components/button';
import {ChatMessage, MessagePosition, MessageTypes} from './components/chatMessage';
import {ButtonWithIcon} from '../../components/buttonWithIcon';
import {CreateChatModal} from './components/createChatModal';

import Block from '../../utils/Block';
import {renderDOM} from '../../utils/router';
import {CHATS_BAR, CHAT_MESSAGES} from '../../constants/constants';

import avatar from '../../../static/icons/samoyed.png';
import pencilIcon from '../../../static/icons/pencil.svg';

export class ChatsPage extends Block {
    init() {
        this.children.profileLink = new Button({
            label: 'Профиль >',
            color: 'transparent-grey',
            type: 'button',
            events: {
                click: () => renderDOM('profile'),
            }
        });

        this.children.createChatModal = new CreateChatModal({
            events: {
                onChatCreated: (chatName: string) => console.log(chatName)
            }
        });

        this.children.buttonWithIcon = new ButtonWithIcon({
            color: 'blue',
            type: 'button',
            icon: pencilIcon,
            size: 'medium',
            alt: 'Create chat',
            events: {
                click: () => (this.children.createChatModal as Block).show('flex'),
            }
        });

        this.children.chatView = new ChatView({
            isSelected: false
        });
        
        this.children.chatList = CHATS_BAR.map(chat => new ChatListItem({
            id: chat.id,
            image: avatar,
            name: chat.name,
            text: chat.text,
            time: chat.lastMessageTime,
            count: chat.newMessagesCount,
            events: {
                onChatSelect: (id: number) => this.onChatItemClick(id)
            }
        }));
    }

    render() {
        return this.compile(template, this.props);
    }

    private onChatItemClick(chatId: number): void {
        (this.children.chatView as ChatView).showSelectedChat({
            isSelected: true,
            image: avatar,
            name: CHATS_BAR.find(chat => chat.id === chatId)?.name,
            messages: this.mapChatMessages()
        });

        (this.children.chatList as Block[]).forEach(block => {
            const chatListItem = block as ChatListItem;

            if (chatListItem.getId() === chatId) {
                chatListItem.select();
            } else {
                chatListItem.unselect();
            }
        });
    }

    private mapChatMessages(): ChatMessage[] {
        return CHAT_MESSAGES.map(message => {
            const messageType = message.type as MessageTypes;

            switch (messageType) {
                case 'file':
                    return new ChatMessage({
                        type: messageType,
                        time: message.time,
                        position: message.position as MessagePosition,
                        text: message.text
                    });
                case 'text':
                    return new ChatMessage({
                        type: messageType,
                        time: message.time,
                        position: message.position as MessagePosition,
                        text: message.text
                    });
                case 'image':
                    return new ChatMessage({
                        type: messageType,
                        time: message.time,
                        position: message.position as MessagePosition,
                        text: message.text,
                        content: {
                            src: message.content?.src
                        }
                    });
                case 'video':
                    return new ChatMessage({
                        type: messageType,
                        time: message.time,
                        position: message.position as MessagePosition,
                        text: message.text,
                        content: {
                            src: message.content?.src,
                            poster: message.content?.poster
                        }
                    });
            }
        }) as ChatMessage[];
    }
}
