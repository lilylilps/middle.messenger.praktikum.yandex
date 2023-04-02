import BaseAPI from './BaseAPI';
import {User} from '../models/user';

export interface SigninData {
	login: string;
	password: string;
}

export interface SignupData {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
}

export class AuthAPI extends BaseAPI {
	constructor() {
		super('/auth');
	}

	signin(data: SigninData): Promise<void> {
		return this.http.post('/signin', data);
	}

	signup(data: SignupData): Promise<void> {
		return this.http.post('/signup', data);
	}

	read(): Promise<User> {
		return this.http.get('/user');
	}

	logout(): Promise<void> {
		return this.http.post('/logout');
	}
}

export default new AuthAPI();
