import Block from '../../../../../../utils/Block';
import template from './chatInput.hbs';

interface ChatInputProps {
    events: {
        keyup: (event: KeyboardEvent) => void;
    };
}

export class ChatInput extends Block<ChatInputProps> {
    constructor(props: ChatInputProps) {
        super(props);
    }

    getValue(): string {
        return (this.element as HTMLInputElement).value;
    }

    clear(): void {
        (this.element as HTMLInputElement).value = '';
    }

    render() {
        return this.compile(template, this.props);
    }
}
