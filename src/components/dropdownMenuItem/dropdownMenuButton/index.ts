import template from './dropdownMenuButton.hbs';

import {DropdownMenuItem, DropdownMenuItemProps} from '..';

interface DropdownMenuButtonProps extends DropdownMenuItemProps {
    events: {
        click: () => void;
    }
}

export class DropdownMenuButton extends DropdownMenuItem {
    constructor(props: DropdownMenuButtonProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
