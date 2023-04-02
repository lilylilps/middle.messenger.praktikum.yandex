import {expect} from 'chai';
import {Store} from './Store';

describe('Store', () => {
    class StoreMock extends Store {}
    let store: StoreMock;
    const data = { 1: '1' };

    beforeEach(() => {
        store = new StoreMock();
    });

    it('should update state with passed params', () => {
        store.set('test', data);

        const state = store.getState();

        expect(state.test).to.eq(data);
    });

    it('should return empty state within clear method', () => {
        store.set('new test', data);
        store.clear();
        const state = store.getState();

        expect(Object.keys(state).length).to.eq(0);
    });
});
