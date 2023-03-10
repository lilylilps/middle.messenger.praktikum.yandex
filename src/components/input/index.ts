import template from './input.hbs';

import Block from '../../utils/Block';

export type InputType = 'email' | 'tel' | 'text' | 'password';
export type InputDirection = 'vertical' | 'horizontal';

interface InputProps {
    label: string;
    direction: InputDirection;
    name: string;
    type: InputType;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string | null;
    events?: {
        focusin: () => void;
        focusout: () => void;
    };
}

export class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    getName(): string {
        return (this.element?.children[0].children[1] as HTMLInputElement).name;
    }

    getValue(): string {
        return (this.element?.children[0].children[1] as HTMLInputElement).value;
    }

    setError(error: string | null): void {
        this.element!.children[1].textContent = error;
    }

    getProps(prop: string): any {
        return this.props[prop];
    }

    render() {
        return this.compile(template, this.props);
    }
}
