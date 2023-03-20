import template from './imagePreview.hbs';

import Block from '../../utils/Block';

interface ImagePreviewProps {
    imagesPreview?: string[];
    files?: File[];
}

export class ImagePreview extends Block {
    constructor(props: ImagePreviewProps) {
        super(props);
    }
    
    getFiles(): File[] {
        return this.props.files || [];
    }

    clear(): void {
        this.props.imagesPreview = null;
        this.props.files = null;
    }

    render() {
        return this.compile(template, this.props);
    }
}
