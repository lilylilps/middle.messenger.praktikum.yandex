import template from './chats.hbs';

import {ChatInfo} from '../../api/ChatsAPI';
import {RESOURCE_URL} from '../../api/ResourceAPI';

import {ChatListItem} from './components/chatListItem';
import {ChatView} from './components/chatView';
import {Button} from '../../components/button';
import {ButtonWithIcon} from '../../components/buttonWithIcon';
import {CreateChatModal} from './components/createChatModal';
import {ChatSearchInput} from './components/chatSearchInput';
import {Toaster} from '../../components/toaster';

import {withStore} from '../../utils/Store';
import Block from '../../utils/Block';
import Router from '../../utils/Router';
import {debounce} from '../../utils/debounce';
import isEqualObjects from '../../utils/isEqualObjects';

import ChatsController from '../../controllers/ChatsController';

import avatar from '../../../static/icons/samoyed.png';
import pencilIcon from '../../../static/icons/pencil.svg';

interface ChatsPageProps {
    chats: ChatInfo[];
    selectedChat: number | undefined;
    isLoaded: boolean;
    canLoadMoreChats: boolean;
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
                keyup: debounce(() =>
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

        this.children.loadMoreChats = new Button({
            label: 'Загрузить еще',
            color: 'transparent-blue',
            type: 'button',
            events: {
                click: () => ChatsController.loadMore().finally(() => {
                    const length = (this.children.chatList as ChatListItem[]).length - 1;
                    const lastChat = (this.children.chatList as ChatListItem[])[length];
                    lastChat.element?.scrollIntoView(false);
                    this.checkSelectedChat();
                }),
            }
        });

        ChatsController.fetchChats().finally(() => this.props.isLoaded = true);

        this.children.errorToaster = new Toaster({});
        (this.children.errorToaster as Block).hide();
    }

    render() {
        return this.compile(template, this.props);
    }

    protected componentDidUpdate(oldProps: ChatsPageProps, newProps: ChatsPageProps): boolean {
        if (isEqualObjects(oldProps, newProps)) return false;

        this.children.chatList = this.props.chats?.map(chat => new ChatListItem({
            id: chat.id,
            image: chat.avatar && `${RESOURCE_URL}${chat.avatar}` || avatar,
            name: chat.title,
            text: chat.last_message?.content,
            time: chat.last_message?.time,
            count: chat.unread_count,
            events: {
                onChatSelect: (id: number) => ChatsController.selectChat(id).finally(() => this.checkSelectedChat())
            }
        })) || [];

        this.checkSelectedChat();

        return true;
    }

    private checkSelectedChat(): void {
        (this.children.chatList as Block[]).forEach(block => {
            const chatListItem = block as ChatListItem;

            if (chatListItem.getId() === this.props.selectedChat) {
                chatListItem.select();
            } else {
                chatListItem.unselect();
            }
        });
    }
}

export const ChatsPage = withStore((state) => ({
    chats: [...(state.chats || [])],
    selectedChat: state.selectedChat,
    canLoadMoreChats: state.canLoadMoreChats,
}))(ChatsPageBase);
