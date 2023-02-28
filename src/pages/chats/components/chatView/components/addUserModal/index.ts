import template from './addUserModal.hbs';

import {Button} from '../../../../../../components/button';
import {Input} from '../../../../../../components/input';
import {ButtonWithIcon} from '../../../../../../components/buttonWithIcon';

import Block from '../../../../../../utils/Block';
import closeIcon from '../../../../../../../static/icons/close.svg';

interface AddUserModalProps {
    events: {
        onUserAdd: (userName: string) => void;
    }
}

export class AddUserModal extends Block {
    constructor(props: AddUserModalProps) {
        super(props);
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
            type: 'submit',
            events: {
                click: () => {
                    const input = (this.children.userNameInput as Input);
                    const userName = input.getValue();

                    if (!userName) {
                        input.setError('Укажите имя пользователя');
                    } else {
                        this.props.events.onUserAdd(userName);
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
