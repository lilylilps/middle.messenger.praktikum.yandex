import template from './filePreview.hbs';

import Block from '../../utils/Block';

interface FilePreviewProps {
    files?: {
        name: string;
        icon: string;
    };
}

export class FilePreview extends Block {
    constructor(props: FilePreviewProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
