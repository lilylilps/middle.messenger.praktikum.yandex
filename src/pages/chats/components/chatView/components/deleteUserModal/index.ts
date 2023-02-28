import template from './deleteUserModal.hbs';

import {Button} from '../../../../../../components/button';
import {Input} from '../../../../../../components/input';
import {ButtonWithIcon} from '../../../../../../components/buttonWithIcon';

import Block from '../../../../../../utils/Block';
import closeIcon from '../../../../../../../static/icons/close.svg';

interface DeleteUserModalProps {
    events: {
        onUserDelete: (userName: string) => void
    }
}

export class DeleteUserModal extends Block {
    constructor(props: DeleteUserModalProps) {
        super(props);
    }

    init() {
        this.children.userNameInput = new Input({
            direction: 'vertical',
            label: 'Имя',
            name: 'user_name',
            type: 'text',
            placeholder: 'Имя пользователя'
        });

        this.children.confirmButton = new Button({
            label: 'Удалить',
            color: 'red',
            type: 'submit',
            events: {
                click: () => {
                    const input = (this.children.userNameInput as Input);
                    const userName = input.getValue();

                    if (!userName) {
                        input.setError('Укажите имя пользователя');
                    } else {
                        this.props.events.onUserDelete(userName);
                        this.hide();
                    }
                }
            }
        });

        this.children.closeButton = new ButtonWithIcon({
            color: 'transparent-grey',
            type: 'button',
            icon: closeIcon,
            size: 'small',
            alt: 'Close',
            events: {
                click: () => this.hide()
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
