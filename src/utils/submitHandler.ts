import {Input} from '../components/input';
import Block from './Block';
import {logFormData} from './formDataLogger';
import {validate} from './validator';
import {renderDOM, ROUTES} from './router';

export const submitHandler = 
    (event: Event, data: Block['children'], redirectPage: keyof typeof ROUTES): void => {
        event.preventDefault();
        const inputs = Object
            .values(data)
            .filter(item => item instanceof Input);

        logFormData(inputs);

        let isInvalidInput = false;

        inputs
            .filter(input => (input as Input).getProps('required'))
            .forEach(input => {
                const validationError = validate(
                    (input as Input).getProps('type'), (input as Input).getValue()
                );
                
                (input as Input).setError(validationError);
                
                if (validationError) {
                    isInvalidInput = true;
                }
            });

        if (!isInvalidInput) {
            renderDOM(redirectPage);
        }
};
