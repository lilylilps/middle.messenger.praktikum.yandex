import template from './chats.hbs';

import {ChatListItem} from './components/chatListItem';
import {ChatView} from './components/chatView';
import {Button} from '../../components/button';
import {ButtonWithIcon} from '../../components/buttonWithIcon';
import {CreateChatModal} from './components/createChatModal';
import {withStore} from '../../utils/Store';
import {ChatInfo} from '../../api/ChatsAPI';

import Block from '../../utils/Block';
import {CHATS_BAR, CHAT_MESSAGES} from '../../constants/constants';

import avatar from '../../../static/icons/samoyed.png';
import pencilIcon from '../../../static/icons/pencil.svg';
import Router from '../../utils/Router';
import ChatsController from '../../controllers/ChatsController';
import { ChatSearchInput } from './components/chatSearchInput';

interface ChatsPageProps {
    chats: ChatInfo[];
    selectedChat?: number | undefined;
    isLoaded: boolean;
}

class ChatsPageBase extends Block<ChatsPageProps> {
    init() {
        this.children.profileLink = new Button({
            label: 'Профиль >',
            color: 'transparent-grey',
            type: 'button',
            events: {
                click: () => Router.go('/profile'),
            }
        });

        this.children.searchInput = new ChatSearchInput({
            events: {
                keyup: this.debounce(() =>
                    ChatsController.fetchChats({title: (this.children.searchInput as ChatSearchInput).getValue()}), 1000
                )
            }
        });

        this.children.createChatModal = new CreateChatModal({
            events: {
                onChatCreated: (chatName: string) => ChatsController.create(chatName)
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

        this.children.chatView = new ChatView({});

        ChatsController.fetchChats().finally(() => this.props.isLoaded = true);
    }

    render() {
        return this.compile(template, this.props);
    }

    protected componentDidUpdate(_oldProps: any, _newProps: any): boolean {
        this.children.chatList = this.props.chats.map(chat => new ChatListItem({
            id: chat.id,
            image: chat.avatar || avatar,
            name: chat.title,
            text: chat.last_message?.content,
            time: chat.last_message?.time,
            count: chat.unread_count,
            events: {
                onChatSelect: (id: number) => this.onChatItemClick(id)
            }
        }));

        (this.children.chatList as Block[]).forEach(block => {
            const chatListItem = block as ChatListItem;

            if (chatListItem.getId() === this.props.selectedChat) {
                chatListItem.select();
            } else {
                chatListItem.unselect();
            }
        });

        return true;
    }

    private onChatItemClick(chatId: number): void {
        ChatsController.selectChat(chatId);

        (this.children.chatList as Block[]).forEach(block => {
            const chatListItem = block as ChatListItem;

            if (chatListItem.getId() === chatId) {
                chatListItem.select();
            } else {
                chatListItem.unselect();
            }
        });
    }

    debounce(callback: () => void, wait: number | undefined) {
        let timer = 0;

        return function(...args: any) {
            clearTimeout(timer);
            timer = setTimeout(callback.bind(this, ...args), wait || 0);
        };
    }
}

export const ChatsPage = withStore((state) => ({
    chats: [...(state.chats || [])],
    selectedChat: state.selectedChat
}))(ChatsPageBase);
