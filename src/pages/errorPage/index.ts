import template from './errorPage.hbs';

import {Button} from '../../components/button';

import Block from '../../utils/Block';
import Router from '../../utils/Router';

interface ErrorPageProps {
    code?: string;
    message?: string;
}

export class ErrorPage extends Block {
    constructor(props?: ErrorPageProps) {
        super(props);
    }

    init() {
        this.children.button = new Button({
            label: 'Назад к чатам',
            color: 'transparent-blue',
            type: 'button',
            events: {
                click: () => Router.go('/'),
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
