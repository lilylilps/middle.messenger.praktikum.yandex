import template from './buttonLink.hbs';

import Block from '../../utils/Block';

interface ButtonLinkProps {
    label: string;
    color: string;
    href: string;
}

export class ButtonLink extends Block {
    constructor(props: ButtonLinkProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
