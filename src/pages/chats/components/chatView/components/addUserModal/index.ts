import template from './addUserModal.hbs';

import {Button} from '../../../../../../components/button';
import {Input} from '../../../../../../components/input';

import Block from '../../../../../../utils/Block';
import closeIcon from '../../../../../../../static/icons/close.svg';

interface AddUserModalProps {
    onUserAdd: (userName: string) => void;
}

export class AddUserModal extends Block {
    constructor(props: AddUserModalProps) {
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

        this.children.addButton = new Button({
            label: 'Добавить',
            color: 'blue',
            type: 'button',
            events: {
                click: () => {
                    const input = (this.children.userNameInput as Input);
                    const userName = input.getValue();

                    if (!userName) {
                        input.setError('Укажите имя пользователя');
                    } else {
                        this.props.onUserAdd(userName);
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
