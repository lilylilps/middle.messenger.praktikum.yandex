import template from './dropdownMenuButton.hbs';

import {DropdownMenuItem, DropdownMenuItemProps} from '..';

export class DropdownMenuButton extends DropdownMenuItem {
    constructor(props: DropdownMenuItemProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
