import template from './toaster.hbs';

import Block from '../../utils/Block';
import {withStore} from '../../utils/Store';
import ToasterController, {ToasterStatus} from '../../controllers/ToasterController';

interface ToasterProps {
    text: string;
    status: ToasterStatus;
}

class ToasterBase extends Block<ToasterProps> {
    private timer?: number = undefined;

    constructor(props: ToasterProps) {
        super(props);
    }

    protected componentDidUpdate(): boolean {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        if (this.props.text) {
            this.show('flex');

            this.timer = setTimeout(() => {
                this.hide();
                ToasterController.clear();
            }, 3000);
        }

        return true;
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const Toaster = withStore((state) => ({
    text: state.toaster?.text,
    status: state.toaster?.status
}))(ToasterBase);
