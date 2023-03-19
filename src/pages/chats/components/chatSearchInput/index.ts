import template from './chatSearchInput.hbs';

import Block from '../../../../utils/Block';

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
