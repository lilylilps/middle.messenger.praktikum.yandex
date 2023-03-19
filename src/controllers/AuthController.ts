import MessagesController from './MessagesController';
import ToasterController from './ToasterController';

import authApi, {AuthAPI, SigninData, SignupData} from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';

export class AuthController {
	private readonly authApi: AuthAPI;

	constructor() {
		this.authApi = authApi;
	}

	async signin(data: SigninData) {
		try {
			await this.authApi.signin(data);

			await this.fetchUser();

			router.go('/chats');
		} catch (e: any) {
			ToasterController.setFailure(e?.reason);
			console.error(e);
		}
	}

	async signup(data: SignupData) {
		try {
			await this.authApi.signup(data);

			await this.fetchUser();

			router.go('/chats');
		} catch (e: any) {
			ToasterController.setFailure(e?.reason);
			console.error(e);
		}
	}

	async fetchUser() {
		const user = await this.authApi.read();
		store.set('user', user);
	}

	async logout() {
		try {
			MessagesController.closeAll();

			await this.authApi.logout();
			store.clear();

			router.go('/');
		} catch (e: any) {
			ToasterController.setFailure(e?.reason);
			console.error(e);
		}
	}
}

export default new AuthController();
