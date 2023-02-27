import template from './imagePreview.hbs';

import Block from '../../utils/Block';

interface ImagePreviewProps {
    images?: string[];
}

export class ImagePreview extends Block {
    constructor(props: ImagePreviewProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
