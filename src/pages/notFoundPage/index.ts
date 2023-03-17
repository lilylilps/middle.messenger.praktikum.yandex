import template from './notFoundPage.hbs';

import Block from '../../utils/Block';

export class NotFoundPage extends Block {
    render() {
        return this.compile(template, this.props);
    }
}
