import Block from '../../../../utils/Block';
import template from './chatSearchInput.hbs';

interface ChatSearchInputProps {
    events: {
        keyDown: () => void;
    }
}

export class ChatSearchInput extends Block<ChatSearchInputProps> {
    constructor(props: ChatSearchInputProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
