import {Input} from "../components/Input";
import Block from "./Block";
import {logFormData} from "./formDataLogger";
import {validate} from "./validator";
import {renderDOM, ROUTES} from "./router";

export const submitHandler = 
    (event: Event, data: Block["children"], redirectPage: keyof typeof ROUTES): void => {
        event.preventDefault();
        const inputs = Object
            .values(data)
            .filter(item => item instanceof Input);

        logFormData(inputs);

        let isInvalidInput = false;

        inputs
            .filter(input => (input as Input).getProps('required'))
            .forEach(input => {
                (input as Input)
                    .setError(
                        validate((input as Input).getProps('type'), (input as Input).getValue())
                    );
                if ((input as Input).getProps('error')) {
                    isInvalidInput = true;
                }
            });

        if (!isInvalidInput) {
            renderDOM(redirectPage);
        }
}
