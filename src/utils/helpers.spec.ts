import {expect} from 'chai';
import {set} from './helpers';

describe('Set function', () => {
    const key = 'key';
    const value = 'test value';
        
    let obj: Record<string, unknown>;

    beforeEach(() => {
        obj = {};
    });

    it('should set a value by key to the object', () => {
        set(obj, key, value);

        expect(obj).to.haveOwnProperty(key, value);
    });

    it('should return original object if not an object passed', () => {
        const notObject = 'string';

        const result = set(notObject, key, value);

        expect(result).to.eq(notObject);
    });

    it('should throw an error if path is not string', () => {
        const path = 10;

        // @ts-ignore
        const f = () => set(obj, path, value);

        expect(f).to.throw(Error);
    });
});
