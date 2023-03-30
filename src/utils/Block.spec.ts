import proxyquire from 'proxyquire';
import {expect} from 'chai';
import sinon from 'sinon';
import type BlockType from './Block';

const eventBusMock = {
    on: sinon.fake(),
    emit: sinon.fake(),
};

const getContentFake = sinon.fake.returns(document.createElement('div'));

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

    it('should change props on setProps', () => {
        class ComponentMock extends Block {
            props: {
                title: ''
            };
        }

        const component = new ComponentMock();
        component.setProps({ title: 'test' });

        expect(component.props.title).to.eq('test');
    });

    it('should change display property on show', () => {
        class ComponentMock extends Block {
            getContent = getContentFake;
        }

        const component = new ComponentMock();
        component.show('block');

        expect(component.getContent().style.display).to.equal("block");
    });

    it('should change display property on hide', () => {
        class ComponentMock extends Block {
            getContent = getContentFake;
        }

        const component = new ComponentMock();
        component.hide();

        expect(component.getContent().style.display).to.equal("none");
    });
});
