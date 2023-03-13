import template from './buttonWithIcon.hbs';

import {ButtonColors, ButtonTypes} from '../button';

import Block from '../../utils/Block';

export type IconSize = 'small' | 'medium';
export type IconDirection = 'right' | 'left';

interface ButtonWitIconProps {
    color: ButtonColors;
    type: ButtonTypes;
    icon: string,
    size: IconSize,
    alt: string,
    direction?: IconDirection,
    events: {
        click: (event: Event) => void;
    };
}

export class ButtonWithIcon extends Block {
    constructor(props: ButtonWitIconProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
