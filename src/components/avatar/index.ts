import template from './avatar.hbs';

import Block from '../../utils/Block';

export type AvatarSize = 'small' | 'medium' | 'large';

interface AvatarProps {
    image: string;
    size: AvatarSize;
    canUpdate?: boolean;
    onChangeAvatar?: (file: File) => void;
}

export class Avatar extends Block {
    constructor(props: AvatarProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }

    componentDidMount(): void {
        if (this.props.canUpdate) {
            this.element?.addEventListener('click', () => {
                const input = document.createElement('input') as HTMLInputElement;
                input.type = 'file';
                input.accept = 'image/jpeg, image/png, image/jpg';

                input.onchange = () => {
                    if (input.files) {
                        this.props.onChangeAvatar(input.files[0]);
                    }
                };

                input.click();
            });
        }
    }
}
