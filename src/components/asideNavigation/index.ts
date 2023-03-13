import template from './asideNavigation.hbs';

import {ButtonWithIcon} from '../buttonWithIcon';

import Block from '../../utils/Block';
import icon from '../../../static/icons/send-arrow.svg';

interface AsideNavigationProps {
    events: {
        click: () => void;
    }
}

export class AsideNavigation extends Block {
    constructor(props: AsideNavigationProps) {
        super(props);
    }

    init() {
        this.children.goBackButton = new ButtonWithIcon({
            color: 'blue',
            type: 'button',
            icon: icon,
            size: 'small',
            alt: 'Go back',
            direction: 'left',
            events: {
                click: this.props.click
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
