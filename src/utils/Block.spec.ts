import proxyquire from 'proxyquire';
import {expect} from 'chai';
import sinon from 'sinon';
import type BlockType from './Block';

const eventBusMock = {
    on: sinon.fake(),
    emit: sinon.fake(),
};

const {default: Block} = proxyquire('./Block', {
    './EventBus': {
        EventBus: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on;
        }
    }
}) as {default: typeof BlockType};

describe('Block', () => {
    class ComponentMock extends Block {}

    it('should fire init event on initialization',  () => {
        new ComponentMock({});

        expect(eventBusMock.emit.calledWith('init')).to.eq(true);
    });

    it.only('should change props on setProps', () => {
        class ComponentMock extends Block {
            props: {
                title: ''
            };
            setProps: (nextProps: Partial<any>) => void;
        }

        const component = new ComponentMock();
        component.setProps({title: 'test'});

        expect(component.props.title).to.eq('test');
    });

    it('should return html element on getContent', () => {});

    it('should change display property on show', () => {});

    it('should change display property on hide', () => {});
});
