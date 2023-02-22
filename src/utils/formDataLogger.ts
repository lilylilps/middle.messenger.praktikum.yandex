import {Input} from "../components/Input";
import Block from "./Block";

export const logFormData = (inputs: Block[]): void => {
    const values = inputs
        .filter(input => (input as Input).getValue())
        .map((input) => ([(input as Input).getName(), (input as Input).getValue()]));

    if (values.length) {
        const data = Object.fromEntries(values);
        console.log(data);
    }
}
