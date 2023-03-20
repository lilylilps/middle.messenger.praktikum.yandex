import template from './filePreview.hbs';

import Block from '../../utils/Block';

interface FilePreview {
    name: string;
    icon: string;
}

interface FilesPreviewProps {
    filesPreview?: FilePreview[];
    files?: File[];
}

export class FilesPreview extends Block {
    constructor(props: FilesPreviewProps) {
        super(props);
    }

    getFiles(): File[] {
        return this.props.files || [];
    }

    clear(): void {
        this.props.filesPreview = null;
        this.props.files = null;
    }


    render() {
        return this.compile(template, this.props);
    }
}
