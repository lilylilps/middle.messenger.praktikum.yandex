import Block from '../../utils/Block';

export interface DropdownMenuItemProps {
    src: string;
    alt: string;
    label: string;
    events?: {
        click: () => void;
    }
}

export class DropdownMenuItem extends Block {
    constructor(props: DropdownMenuItemProps) {
        super(props);
    }
}
