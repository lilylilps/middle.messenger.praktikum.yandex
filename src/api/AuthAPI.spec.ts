import {expect} from 'chai';
import sinon, {SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic} from 'sinon';
import {AuthAPI} from './AuthAPI';

describe('AuthAPI', () => {
    class AuthAPIMock extends AuthAPI {}
    let xhr: SinonFakeXMLHttpRequestStatic;
    const requests: SinonFakeXMLHttpRequest[] = [];

    const signInData = {login: '123', password: '123'};
    const signUpData = {
        first_name: 'Ivan',
        second_name: 'Ivanov',
        login: '123',
        email: 'i.ivanov@bk.ru',
        password: '123',
        phone: '88008008080'
    };

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();

        // @ts-ignore
        global.XMLHttpRequest = xhr;

        xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        });
    });

    afterEach(() => {
        requests.length = 0;
    });

    it('should send request to /signin within signin method', () => {
        const authAPI = new AuthAPIMock();

        authAPI.signin(signInData);
        const [request] = requests;

        expect(request.url.includes('/signin')).to.eq(true);
    });

    it('should send request to /signup within signup method', () => {
        const authAPI = new AuthAPIMock();

        authAPI.signup(signUpData);
        const [request] = requests;

        expect(request.url.includes('/signup')).to.eq(true);
    });

    it('should send request to /user within read method', () => {
        const authAPI = new AuthAPIMock();

        authAPI.read();
        const [request] = requests;

        expect(request.url.includes('/user')).to.eq(true);
    });

    it('should send request to /logout within logout method', () => {
        const authAPI = new AuthAPIMock();

        authAPI.logout();
        const [request] = requests;

        expect(request.url.includes('/logout')).to.eq(true);
    });
});
