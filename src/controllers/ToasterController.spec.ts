import {expect} from 'chai';
import store from '../utils/Store';
import {ToasterController} from './ToasterController';

describe('Toaster controller', () => {
    class ToasterControllerMock extends ToasterController {}
    let toaster: ToasterController;

    beforeEach(() => {
        toaster = new ToasterControllerMock();
    });

    beforeEach(() => {
        toaster.clear();
    });

    it('should set to store failure state within setFailure method', () => {
        toaster.setFailure('error');

        expect(store.getState().toaster.text).to.eq('error');
        expect(store.getState().toaster.status).to.eq('failure');
    });

    it('should set to store success state within setSuccess method', () => {
        toaster.setSuccess('done');
        
        expect(store.getState().toaster.text).to.eq('done');
        expect(store.getState().toaster.status).to.eq('success');
    });

    it('should clear toaster state in store within clear method', () => {
        toaster.clear();

        expect(store.getState().toaster.text).to.eq('');
        expect(store.getState().toaster.status).to.eq(undefined);
    });
});
