import template from './deleteUserModal.hbs';

import {Button} from '../../../../../../components/button';
import {Input} from '../../../../../../components/input';

import Block from '../../../../../../utils/Block';
import closeIcon from '../../../../../../../static/icons/close.svg';

interface DeleteUserModalProps {
    onUserDelete: (userName: string) => void
}

export class DeleteUserModal extends Block {
    constructor(props: DeleteUserModalProps) {
        super(props);
        this.props.closeIcon = closeIcon;
    }

    init() {
        this.children.userNameInput = new Input({
            direction: 'vertical',
            label: 'Имя',
            name: 'userName',
            type: 'text',
            placeholder: 'Имя пользователя'
        });

        this.children.confirmButton = new Button({
            label: 'Удалить',
            color: 'red',
            type: 'button',
            events: {
                click: () => {
                    const input = (this.children.userNameInput as Input);
                    const userName = input.getValue();

                    if (!userName) {
                        input.setError('Укажите имя пользователя');
                    } else {
                        this.props.onUserDelete(userName);
                        this.hide();
                    }
                }
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }

    componentDidMount(): void {
        const closeButton = this.element?.querySelector('#close');
        closeButton?.addEventListener('click', () => this.hide());
    }
}
