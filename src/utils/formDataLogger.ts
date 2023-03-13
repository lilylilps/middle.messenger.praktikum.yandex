import Block from './Block';

import {Input} from '../components/input';

export const logFormData = (data: Block['children']): any => {
    const inputs = Object
    .values(data)
    .filter(item => item instanceof Input);

    const values = inputs
        .filter(input => (input as Input).getValue())
        .map((input) => ([(input as Input).getName(), (input as Input).getValue()]));

    if (values.length) {
        const data = Object.fromEntries(values);
        return data;
    }
};
