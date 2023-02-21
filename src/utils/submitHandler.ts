import {Input} from "../components/Input";
import Block from "./Block";
import {logFormData} from "./formDataLogger";
import {validate} from "./validator";

export const submitHandler = (event: Event, data: Block["children"], redirectPage: string = 'signIn'): void => {
    event.preventDefault();
    const inputs = Object
        .values(data)
        .filter(item => item instanceof Input);

    logFormData(inputs);

    let isInvalidInput = false;

    inputs.forEach(input => {
        (input as Input).setError(validate((input as Input).getType(), (input as Input).getValue()));
        console.log((input as Input).getError());
    });
    // if (inputs.every(input => input.))

    // console.log(validatedInputs);
}
