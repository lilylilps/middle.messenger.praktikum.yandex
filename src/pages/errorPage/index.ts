import template from './errorPage.hbs';

import {Button} from '../../components/button';

import Block from '../../utils/Block';
import {renderDOM} from '../../utils/router';

interface ErrorPageProps {
    code: string;
    message: string;
}

export class ErrorPage extends Block {
    constructor(props: ErrorPageProps) {
        super(props);
    }

    init() {
        this.children.button = new Button({
            label: 'Назад к чатам',
            color: 'transparent-blue',
            type: 'button',
            events: {
                click: () => renderDOM('signUp'),
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
