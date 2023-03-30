import {Button, ButtonProps} from './index';
import {expect} from 'chai';
import sinon from 'sinon';

describe('Button', () => {
    const spyFunction = sinon.spy((event: Event) => { event.preventDefault(); });
    const buttonMockProps: ButtonProps = {
        label: 'test label',
        color: 'red',
        type: 'button',
        events: {
            click: spyFunction,
        },
    };

    class ButtonMock extends Button {}

    it('should render', () => {
        new ButtonMock(buttonMockProps);
    });

    it('element should return button element', () => {
        const button = new ButtonMock(buttonMockProps);
        const element = button.element;

        expect(element).to.be.instanceof(window.HTMLButtonElement)
    });

    it('should call passed function on click', () => {
        const button = new ButtonMock(buttonMockProps);

        const element = button.element as HTMLSpanElement;

        element.click();

        expect(spyFunction.calledOnce).to.eq(true);
    });
});
