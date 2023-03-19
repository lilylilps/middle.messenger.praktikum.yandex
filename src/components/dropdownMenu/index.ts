import template from './dropdownMenu.hbs';

import {DropdownMenuItem} from '../dropdownMenuItem';

import Block from '../../utils/Block';

export type DropdownMenuPosition = 'top' | 'bottom';

interface DropdownMenuProps {
    items: DropdownMenuItem[];
    position: DropdownMenuPosition;
}

export class DropdownMenu extends Block<DropdownMenuProps> {
    private isOpen: boolean = false;

    constructor(props: DropdownMenuProps) {
        super(props);
    }

    toggle(): void {
        if (this.isOpen) {
            this.hide();
        } else {
            this.show('block');
        }

        this.isOpen = !this.isOpen;
    }

    hideMenu(): void {
        this.isOpen = false;
        this.hide();
    }

    render() {
        return this.compile(template, this.props);
    }
}
