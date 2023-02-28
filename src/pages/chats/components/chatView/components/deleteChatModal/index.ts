import template from './deleteChatModal.hbs';

import {Button} from '../../../../../../components/button';
import {ButtonWithIcon} from '../../../../../../components/buttonWithIcon';

import Block from '../../../../../../utils/Block';
import closeIcon from '../../../../../../../static/icons/close.svg';

interface DeleteChatModalProps {
    events: {
        onChatDelete: () => void
    }
}

export class DeleteChatModal extends Block {
    constructor(props: DeleteChatModalProps) {
        super(props);
    }

    init() {
        this.children.confirmButton = new Button({
            label: 'Удалить',
            color: 'red',
            type: 'submit',
            events: {
                click: () => {
                    this.props.events.onChatDelete();
                    this.hide();
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
                click: () => this.hide()
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
