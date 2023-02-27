import Block from './Block';

import {Input} from '../components/input';

export const logFormData = (inputs: (Block | Block[])[]): void => {
    const values = inputs
        .filter(input => (input as Input).getValue())
        .map((input) => ([(input as Input).getName(), (input as Input).getValue()]));

    if (values.length) {
        const data = Object.fromEntries(values);
        console.log(data);
    }
};
