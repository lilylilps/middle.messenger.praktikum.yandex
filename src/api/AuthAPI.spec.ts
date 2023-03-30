// import sinon, {SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic} from 'sinon';
// import {expect} from 'chai';
// import {AuthAPI} from './AuthAPI';
// import HTTPTransport from '../utils/HTTPTransport';

describe('AuthAPI', () => {
    // class AuthAPIMock extends AuthAPI {}
    // let xhr: SinonFakeXMLHttpRequestStatic;
    // let instance: HTTPTransport;
    // const requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        // xhr = sinon.useFakeXMLHttpRequest();

        // // @ts-ignore
        // global.XMLHttpRequest = xhr;

        // xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
        //     requests.push(request);
        // });

        // instance = new HTTPTransport('/auth');
    });

    afterEach(() => {
        // requests.length = 0;
    });

    it.only('should send request to /signin within signin method', () => {
        // const authAPI = new AuthAPIMock();

        // authAPI.signin({login: '123', password: '123'});

        // expect(instance.post).arguments.includes('/signin');
    });

    it('should send request to /signup within signup method', () => {

    });

    it('should send request to /user within read method', () => {

    });

    it('should send request to /logout within logout method', () => {

    });
});
