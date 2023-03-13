import authApi, {AuthAPI, SigninData, SignupData} from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';
import MessagesController from './MessagesController';
import resourceApi, {ResourceAPI} from '../api/ResourceAPI';

export class AuthController {
  private readonly authApi: AuthAPI;
  private readonly resourceApi: ResourceAPI;

  constructor() {
    this.authApi = authApi;
    this.resourceApi = resourceApi;
  }

  async signin(data: SigninData) {
    try {
      await this.authApi.signin(data);

      await this.fetchUser();

      router.go('/chats');
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.authApi.signup(data);

      await this.fetchUser();

      router.go('/chats');
    } catch (e: any) {
      console.error(e);
    }
  }

  async fetchUser() {
    const user = await this.authApi.read();
    if (user.avatar) {
        const image = await this.resourceApi.read(user.avatar);
        
        const imageObjectUrl = URL.createObjectURL(image);
        user.avatar = imageObjectUrl;
    }

    store.set('user', user);
  }

  async logout() {
    try {
      MessagesController.closeAll();

      await this.authApi.logout();

      router.go('/');
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new AuthController();
