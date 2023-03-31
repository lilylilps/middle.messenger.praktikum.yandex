import {defaultErrorMessage} from "../constants/constants";
import store from "../utils/Store";

export type ToasterStatus = 'success' | 'failure';

export class ToasterController {
    setFailure(text?: string): void {
        store.set('toaster', {
            text:  text || defaultErrorMessage,
            status: 'failure'
        });
    }

    setSuccess(text: string): void {
        store.set('toaster', {
            text:  text,
            status: 'success'
        });
    }

    clear(): void {
        store.set('toaster', {
            text: '',
            status: undefined
        });
    }
}

export default new ToasterController();
