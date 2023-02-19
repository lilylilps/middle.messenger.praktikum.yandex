import template from './button.hbs';

import Block from '../../utils/Block';

interface ButtonProps {
    label: string;
    color: string;
    type: string;
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
