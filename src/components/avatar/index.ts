import template from './avatar.hbs';

import Block from '../../utils/Block';

interface AvatarProps {
    image: HTMLImageElement;
    size: 'small' | 'medium' | 'large';
    canUpdate?: boolean;
}

export class Avatar extends Block {
    constructor(props: AvatarProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
