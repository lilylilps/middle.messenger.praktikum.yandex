import template from './createChatModal.hbs';

import {Input} from '../../../../components/input';
import {Button} from '../../../../components/button';
import {ButtonWithIcon} from '../../../../components/buttonWithIcon';

import Block from '../../../../utils/Block';
import closeIcon from '../../../../../static/icons/close.svg';

interface CreateChatModalProps {
    events: {
        onChatCreated: (chatName: string) => void;
    }
}

export class CreateChatModal extends Block<CreateChatModalProps> {
    constructor(props: CreateChatModalProps) {
        super(props);
    }

    init() {
        this.children.chatNameInput = new Input({
            direction: 'vertical',
            label: 'Название',
            name: 'chat_name',
            type: 'text',
            placeholder: 'Новый чат'
        });

        this.children.createButton = new Button({
            label: 'Добавить',
            color: 'blue',
            type: 'submit',
            events: {
                click: () => {
                    const input = (this.children.chatNameInput as Input);
                    const chatName = input.getValue();

                    if (!chatName) {
                        input.setError('Название чата не может быть пустым');
                    } else {
                        this.props.events.onChatCreated(chatName);
                        input.clear();
                        this.hide();
                    }
                }
            }
        });

        this.children.closeButton = new ButtonWithIcon({
            color: 'transparent-grey',
            type: 'button',
            icon: closeIcon,
            size: 'small',
            alt: 'Close',
            events: {
                click: () => {
                    const input = (this.children.chatNameInput as Input);
                    input.clear();
                    this.hide();
                }
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
