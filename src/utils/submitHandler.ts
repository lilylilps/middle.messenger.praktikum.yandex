import Block from './Block';
import {validateInput} from './validator';
// import Router from './Router';
import {Input} from '../components/input';

// import {Routes} from '../..';

export const submitHandler = 
    (event: Event, data: Block['children']): boolean => {
        event.preventDefault();
        const inputs = Object
            .values(data)
            .filter(item => item instanceof Input);

        let isInvalidInput = false;

        inputs
            .filter(input => (input as Input).getProps('required'))
            .forEach(input => {
                const validationError = validateInput(
                    (input as Input).getName(), (input as Input).getValue()
                );
                
                (input as Input).setError(validationError);
                
                if (validationError) {
                    isInvalidInput = true;
                }
            });

        if (!isInvalidInput) {
            return true;
        } else return false;
};
