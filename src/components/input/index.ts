import template from './input.hbs';

import Block from '../../utils/Block';

interface InputProps {
    label: string;
    direction: string;
    name: string;
    type: 'email' | 'tel' | 'text' | 'password';
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
}

export class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    getName() {
        return (this.element?.children[0].children[1] as HTMLInputElement).name;
    }

    getValue() {
        return (this.element?.children[0].children[1] as HTMLInputElement).value;
    }

    setError(error: string | undefined) {
        const inputValue = (this.element?.children[0].children[1] as HTMLInputElement).value;
        this.setProps({error, value: inputValue});
    }

    getProps(prop: string) {
        return this.props[prop];
    }

    render() {
        return this.compile(template, this.props);
    }
}
