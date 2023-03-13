import template from './avatar.hbs';

import Block from '../../utils/Block';

export type AvatarSize = 'small' | 'medium' | 'large';

interface AvatarProps {
    image: string;
    size: AvatarSize;
    canUpdate?: boolean;
    events?: {
        onChangeAvatar: (file: File) => void;
    }
}

export class Avatar extends Block {
    constructor(props: AvatarProps) {
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

        if (this.props.fileType === 'image') {
            input.accept = 'image/jpeg, image/png, image/jpg';
        } 

        input.onchange = () => {
            if (input.files?.length) {
                this.props.events.onChangeAvatar(input.files[0]);
            }
        };

        input.click();
    }
}
