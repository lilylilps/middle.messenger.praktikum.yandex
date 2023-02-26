import template from './chatMessage.hbs';

import Block from '../../../../utils/Block';

import fileIcon from '../../../../../static/icons/fileIcon.svg';

export type MessageTypes = 'text' | 'image' | 'video' | 'file';
export type MessagePosition = 'left' | 'right';

interface Content {
    src: string;
    poster?: string;
}

interface ChatMessageProps {
    type: MessageTypes;
    content?: Content;
    text?: string;
    time: string;
    position: MessagePosition;
}

export class ChatMessage extends Block {
    constructor(props: ChatMessageProps) {
        super(props);
        this.props.fileIcon = fileIcon;
    }

    render() {
        return this.compile(template, this.props);
    }
}
