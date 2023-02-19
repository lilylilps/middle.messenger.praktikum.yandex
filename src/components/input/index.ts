import template from './input.hbs';

import Block from '../../utils/Block';

interface InputProps {
    label: string;
    direction: string;
    name: string;
    type: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
}

export class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    getName() {
        return (this.element?.children[1] as HTMLInputElement).name;
    }

    getValue() {
        return (this.element?.children[1] as HTMLInputElement).value;
    }

    render() {
        return this.compile(template, this.props);
    }
}
