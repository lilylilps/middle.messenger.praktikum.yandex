import {Input} from "../components/Input";
import Block from "./Block";

export const logFormData = (inputs: Block[]): void => {
    const values = inputs.map((input) => ([(input as Input).getName(), (input as Input).getValue()]));

    const data = Object.fromEntries(values);
    console.log(data);
}
