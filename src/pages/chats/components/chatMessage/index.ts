import template from './chatMessage.hbs';

import Block from '../../../../utils/Block';
import {dateFormat} from '../../../../utils/dateFormat';

import fileIcon from '../../../../../static/icons/fileIcon.svg';

export type MessageTypes = 'text' | 'image' | 'video' | 'file';
export type MessagePosition = 'left' | 'right';

interface Content {
    src: string;
    poster?: string;
}

interface ChatMessageProps {
    id: number;
    type: MessageTypes;
    content?: Content;
    text?: string;
    time: string;
    position: MessagePosition;
    author?: string;
    fileIcon?: string;
}

export class ChatMessage extends Block<ChatMessageProps> {
    constructor(props: ChatMessageProps) {
        super({...props, fileIcon: fileIcon});
    }

    init() {
        this.props.time = dateFormat(this.props.time, true, true);
    }

    render() {
        return this.compile(template, this.props);
    }
}
