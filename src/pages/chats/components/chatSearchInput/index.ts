import Block from '../../../../utils/Block';
import template from './chatSearchInput.hbs';

interface ChatSearchInputProps {
    events: {
        keyup: () => void;
    }
}

export class ChatSearchInput extends Block<ChatSearchInputProps> {
    constructor(props: ChatSearchInputProps) {
        super(props);
    }

    getValue(): string {
        return (this.element as HTMLInputElement).value;
    }

    render() {
        return this.compile(template, this.props);
    }
}
