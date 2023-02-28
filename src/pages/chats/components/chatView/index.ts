import template from './chatView.hbs';

import {ChatMessage} from '../chatMessage';
import {Avatar} from '../../../../components/avatar';
import {DropdownMenu} from '../../../../components/dropdownMenu';
import {ButtonWithIcon} from '../../../../components/buttonWithIcon';
import {DropdownMenuButton} from '../../../../components/dropdownMenuItem/dropdownMenuButton';
import {DropdownMenuInput} from '../../../../components/dropdownMenuItem/dropdownMenuInput';
import {ImagePreview} from '../../../../components/imagePreview';
import {FilePreview} from '../../../../components/filePreview';
import {DeleteUserModal} from './components/deleteUserModal';
import {DeleteChatModal} from './components/deleteChatModal';
import {AddUserModal} from './components/addUserModal';

import Block from '../../../../utils/Block';

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
    isSelected: boolean;
    image?: HTMLImageElement;
    name?: string;
    messages?: ChatMessage[];
}

export class ChatView extends Block {
    constructor(props: ChatViewProps) {
        super(props);

        this.props.menuIcon = menuIcon;
        this.props.uploadIcon = uploadIcon;
    }

    init() {
        this.children.sendMessageButton = new ButtonWithIcon({
            color: 'blue',
            type: 'submit',
            icon: sendIcon,
            size: 'small',
            alt: 'Send message',
            direction: 'right',
            events: {
                click: () => console.log('Message was sent')
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
        this.children.filesPreview = new FilePreview({});

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
                                .setProps({images: files.map(file => URL.createObjectURL(file))});
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
                            (this.children.filesPreview as FilePreview)
                                .setProps({files: files.map(file => {
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
                onUserAdd: (userName: string) => console.log(userName)
            }
        });

        this.children.deleteUserModal = new DeleteUserModal({
            events: {
                onUserDelete: (userName: string) => console.log(userName)
            }
        });

        this.children.deleteChatModal = new DeleteChatModal({
            events: {
                onChatDelete: () => console.log('Chat was deleted')
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }

    showSelectedChat(props: ChatViewProps): void {
        this.children.messages = props.messages ?? [];

        this.children.chatImage = new Avatar({
            image: props.image ?? avatar,
            size: 'small',
            canUpdate: true,
            events: {
                onChangeAvatar: (file: File) => console.log(file)
            }
        });

        (this.children.chatImage as Block).dispatchComponentDidMount();
        (this.children.messages as Block[])
            .forEach(message => (message as Block).dispatchComponentDidMount());

        this.setProps({...props, events: {
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
        }});
    }
}
