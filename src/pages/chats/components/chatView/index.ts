import template from './chatView.hbs';

import {RESOURCE_URL} from '../../../../api/ResourceAPI';

import {ChatMessage} from '../chatMessage';
import {Avatar} from '../../../../components/avatar';
import {DropdownMenu} from '../../../../components/dropdownMenu';
import {ButtonWithIcon} from '../../../../components/buttonWithIcon';
import {DropdownMenuButton} from '../../../../components/dropdownMenuItem/dropdownMenuButton';
import {DropdownMenuInput} from '../../../../components/dropdownMenuItem/dropdownMenuInput';
import {ImagePreview} from '../../../../components/imagePreview';
import {FilesPreview} from '../../../../components/filePreview';
import {DeleteUserModal} from './components/deleteUserModal';
import {DeleteChatModal} from './components/deleteChatModal';
import {AddUserModal} from './components/addUserModal';
import {withStore} from '../../../../utils/Store';
import {ChatInput} from './components/chatInput';
import {Button} from '../../../../components/button';

import Block from '../../../../utils/Block';
import isEqualArrays from '../../../../utils/isEqualArrays';

import MessageController, {Message} from '../../../../controllers/MessagesController';
import ChatsController from '../../../../controllers/ChatsController';

import {User} from '../../../../models/user';

import menuIcon from '../../../../../static/icons/menu.svg';
import uploadIcon from '../../../../../static/icons/clip.svg';
import fileIcon from '../../../../../static/icons/fileIcon.svg';
import sendIcon from '../../../../../static/icons/send-arrow.svg';
import addIcon from '../../../../../static/icons/add.svg';
import deleteUserIcon from '../../../../../static/icons/cancel.svg';
import deleteChatIcon from '../../../../../static/icons/delete.svg';
import attachImageIcon from '../../../../../static/icons/img-attach.svg';
import attachFileIcon from '../../../../../static/icons/file-attach.svg';
import avatar from '../../../../../static/icons/samoyed.png';

interface ChatViewProps {
    image: string;
    name: string;
    selectedChat: number | undefined;
    selectedChatUsers: User[];
    messages: Message[];
    userId: number;
    canLoadMoreMessages: boolean;
    menuIcon?: string;
    uploadIcon?: string;
}

class ChatViewBase extends Block<ChatViewProps> {
    private offset: number = 0;

    constructor(props: ChatViewProps) {
        super({...props, menuIcon: menuIcon, uploadIcon: uploadIcon});
    }

    init() {
        this.children.messages = this.createMessages(this.props);

        this.children.sendMessageButton = new ButtonWithIcon({
            color: 'blue',
            type: 'submit',
            icon: sendIcon,
            size: 'small',
            alt: 'Send message',
            direction: 'right',
            events: {
                click: () => this.sendMessage()
            }
        });

        this.children.chatInput = new ChatInput({
            events: {
                keyup: (event: KeyboardEvent) => {
                    if (event.key === "Enter") {
                        this.sendMessage();
                    }
                }
            }
        });

        this.children.loadMoreButton = new Button({
            label: 'Загрузить старые сообщения',
            color: 'transparent-blue',
            type: 'button',
            events: {
                click: () => {
                    this.offset += 20;
                    MessageController.fetchMessages(this.props.selectedChat!, this.offset);
                }
            }
        });

        this.children.headerDropdownMenu = new DropdownMenu({
            items: [
                new DropdownMenuButton({
                    src: addIcon,
                    alt: 'add user',
                    label: 'Добавить пользователя',
                    events: {
                        click: () => (this.children.addUserModal as Block).show('flex')
                    }
                }),
                new DropdownMenuButton({
                    src: deleteUserIcon,
                    alt: 'delete user',
                    label: 'Удалить пользователя',
                    events: {
                        click: () => (this.children.deleteUserModal as Block).show('flex')
                    }
                }),
                new DropdownMenuButton({
                    src: deleteChatIcon,
                    alt: 'delete chat',
                    label: 'Удалить чат',
                    events: {
                        click: () => (this.children.deleteChatModal as Block).show('flex')
                    }
                })
            ],
            position: 'top'
        });

        this.children.imagesPreview = new ImagePreview({});
        this.children.filesPreview = new FilesPreview({});

        this.children.footerDropdownMenu = new DropdownMenu({
            items: [
                new DropdownMenuInput({
                    src: attachImageIcon,
                    alt: 'photo/video',
                    label: 'Фото или видео',
                    fileType: 'image',
                    events: {
                        onFileUpload: (files: File[]) => {
                            (this.children.imagesPreview as ImagePreview)
                                .setProps({
                                    files: files,
                                    imagesPreview: files.map(file => URL.createObjectURL(file))
                                });
                        }
                    }
                }),
                new DropdownMenuInput({
                    src: attachFileIcon,
                    alt: 'file',
                    label: 'Файл',
                    fileType: 'file',
                    events: {
                        onFileUpload: (files: File[]) => {
                            (this.children.filesPreview as FilesPreview)
                                .setProps({
                                    files: files,
                                    filesPreview: files.map(file => {
                                        return {
                                            name: file.name,
                                            icon: fileIcon
                                    };
                                })
                            });
                        }
                    }
                })
            ],
            position: 'bottom'
        });

        this.children.addUserModal = new AddUserModal({
            events: {
                onUserAdd: (user: User) => ChatsController.addUserToChat(this.props.selectedChat!, user.id)
            }
        });

        this.children.deleteUserModal = new DeleteUserModal({
            events: {
                onUserDelete: (user: User) => ChatsController.deleteUserFromChat(this.props.selectedChat!, user.id)
            }
        });

        this.children.deleteChatModal = new DeleteChatModal({
            events: {
                onChatDelete: () => ChatsController.delete(this.props.selectedChat!)
            }
        });
        
        this.setProps({
            ...this.props, events: {
                click: (event: Event) => {
                    const target = event.target as HTMLElement;

                    if (target.closest('#headerDropdownMenu')) {
                        (this.children.headerDropdownMenu as DropdownMenu).toggle();
                        (this.children.footerDropdownMenu as DropdownMenu).hideMenu();
                    } else if (target.closest('#footerDropdownMenu')) {
                        (this.children.footerDropdownMenu as DropdownMenu).toggle();
                        (this.children.headerDropdownMenu as DropdownMenu).hideMenu();
                    } else {
                        (this.children.headerDropdownMenu as DropdownMenu).hideMenu();
                        (this.children.footerDropdownMenu as DropdownMenu).hideMenu();
                    }
                }
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }

    protected componentDidUpdate(oldProps: ChatViewProps, newProps: ChatViewProps): boolean {
        if (!isEqualArrays(oldProps.messages, newProps.messages))
            this.children.messages = this.createMessages(newProps);

        if (this.props.selectedChat !== newProps.selectedChat) {
            this.children.imagesPreview = new ImagePreview({});
            this.children.filesPreview = new FilesPreview({});
            (this.children.chatInput as ChatInput).clear();
        }

        this.children.chatImage = new Avatar({
            image: this.props.image && `${RESOURCE_URL}${this.props.image}` || avatar,
            size: 'small',
            canUpdate: true,
            events: {
                onChangeAvatar: (file: File) =>
                    ChatsController.updateAvatar({id: this.props.selectedChat!, avatar: file})
            }
        });

        return true;
    }
    
    private createMessages(props: ChatViewProps) {
        return props.messages?.map((data: Message) => {
            const messageAuthor = props.selectedChatUsers?.find(user => user.id === data.user_id);

            if (data.file) {
                return new ChatMessage({
                    id: data.id,
                    type: 'image',
                    content: {
                        src: `${RESOURCE_URL}${data.file.path}`
                    },
                    time: data.time,
                    position: props.userId === data.user_id ? 'right' : 'left',
                    author: props.userId !== data.user_id
                        ? messageAuthor?.display_name || messageAuthor?.login
                        : ''
                });
            }

            return new ChatMessage({
                id: data.id,
                type: 'text',
                text: data.content,
                time: data.time,
                position: props.userId === data.user_id ? 'right' : 'left',
                author: props.userId !== data.user_id
                        ? messageAuthor?.display_name || messageAuthor?.login
                        : ''
            });
        }) || [];
    }

    private sendMessage(): void {
        const input = this.children.chatInput as ChatInput;
        const message = input.getValue();

        input.clear();

        if (message) 
            MessageController.sendMessage(this.props.selectedChat!, message);

        const imagesPreview = (this.children.imagesPreview as ImagePreview);
        const filesPreview = (this.children.filesPreview as FilesPreview);
        const files = [...imagesPreview.getFiles(), ...filesPreview.getFiles()];

        if (files)
            ChatsController.sendFiles(this.props.selectedChat!, files).finally(() => {
                imagesPreview.clear();
                filesPreview.clear();
            });
    }
}

const withSelectedChatView = withStore(state => {
    const selectedChatId = state.selectedChat;

    if (!selectedChatId) {
        return {
            messages: [],
            selectedChat: undefined,
            userId: state.user?.id
        };
    }
  
    return {
        messages: (state.messages || {})[selectedChatId] || [],
        selectedChat: state.selectedChat || undefined,
        selectedChatUsers: state.chatUsers || [],
        userId: state.user.id,
        name: state.chats.find(chat => chat.id === selectedChatId)?.title,
        image: state.chats.find(chat => chat.id === selectedChatId)?.avatar,
        canLoadMoreMessages: (state.canLoadMoreMessages || {})[selectedChatId] || false,
    };
});
  
export const ChatView = withSelectedChatView(ChatViewBase);
