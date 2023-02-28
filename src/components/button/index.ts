import template from './button.hbs';

import Block from '../../utils/Block';

export type ButtonColors = 'blue' | 'red' | 'transparent-blue' | 'transparent-red' | 'transparent-grey';
export type ButtonTypes = 'button' | 'submit';

interface ButtonProps {
    label: string;
    color: ButtonColors;
    type: ButtonTypes;
    events: {
        click: (event: Event) => void;
    };
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
