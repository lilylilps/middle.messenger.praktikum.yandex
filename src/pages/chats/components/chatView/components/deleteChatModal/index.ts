import template from './deleteChatModal.hbs';

import {Button} from '../../../../../../components/button';
import Block from '../../../../../../utils/Block';
import closeIcon from '../../../../../../../static/icons/close.svg';

interface DeleteChatModalProps {
    onChatDelete: () => void;
}

export class DeleteChatModal extends Block {
    constructor(props: DeleteChatModalProps) {
        super(props);
        this.props.closeIcon = closeIcon;
    }

    init() {
        this.children.confirmButton = new Button({
            label: 'Удалить',
            color: 'red',
            type: 'button',
            events: {
                click: () => {
                    this.props.onChatDelete();
                    this.hide();
                }
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }

    componentDidMount(): void {
        const closeButton = this.element?.querySelector('#close');
        closeButton?.addEventListener('click', () => this.hide());
    }
}
