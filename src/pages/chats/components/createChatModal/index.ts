import template from './createChatModal.hbs';

import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';

import Block from '../../../../utils/Block';
import closeIcon from '../../../../../static/icons/close.svg';

interface CreateChatModalProps {
    onChatCreated: (chatName: string) => void
}

export class CreateChatModal extends Block {
    constructor(props: CreateChatModalProps) {
        super(props);
        this.props.closeIcon = closeIcon;
    }

    init() {
        this.children.chatNameInput = new Input({
            direction: 'vertical',
            label: 'Название',
            name: 'chatName',
            type: 'text',
            placeholder: 'Новый чат'
        });

        this.children.createButton = new Button({
            label: 'Добавить',
            color: 'blue',
            type: 'button',
            events: {
                click: () => {
                    const input = (this.children.chatNameInput as Input);
                    const chatName = input.getValue();

                    if (!chatName) {
                        input.setError('Название чата не может быть пустым');
                    } else {
                        this.props.onChatCreated(chatName);
                        this.hide();
                    }
                }
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }

    componentDidMount() {
        const closeButton = this.element?.querySelector('#close');
        closeButton?.addEventListener('click', () => this.hide());
    }
}
