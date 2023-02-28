import template from './dropdownMenuInput.hbs';

import {DropdownMenuItem, DropdownMenuItemProps} from '..';

export type FileType = 'image' | 'file';

interface DropdownMenuInputProps extends DropdownMenuItemProps {
    fileType: FileType,
    events: {
        onFileUpload: (file: File[]) => void;
    }
}

export class DropdownMenuInput extends DropdownMenuItem {
    constructor(props: DropdownMenuInputProps) {
        const expandedProps = {...props, events: {
            ...props.events,
            click: () => this.createInput()
        }};
        super(expandedProps);
    }

    render() {
        return this.compile(template, this.props);
    }

    private createInput(): void {
        const input = document.createElement('input') as HTMLInputElement;
        input.type = 'file';
        input.multiple = true;

        if (this.props.fileType === 'image') {
            input.accept = 'image/jpeg, image/png, image/jpg';
        } 

        input.onchange = () => {
            if (input.files) {
                this.props.events.onFileUpload(Array.from(input.files));
            }
        };

        input.click();
    }
}
