import ToasterController from './ToasterController';

import userApi, {UserAPI, ChangeProfileData, ChangePasswordData, ChangeAvatarData} from '../api/UserAPI';
import router from '../utils/router';
import store from '../utils/Store';

export class UserController {
    private readonly userApi: UserAPI;

    constructor() {
        this.userApi = userApi;
    }

    async updateProfile(data: ChangeProfileData) {
        try {
            const user = await this.userApi.updateProfile(data);
            store.set('user', user);

            router.go('/profile');
        } catch (e: any) {
            ToasterController.setFailure(e?.reason);
            console.error(e);
        }
    }

    async updatePassword(data: ChangePasswordData) {
        try {
            await this.userApi.updatePassword(data);
            router.go('/profile');
        } catch (e: any) {
            ToasterController.setFailure(e?.reason);
            console.error(e);
        }
    }

    async updateAvatar(data: ChangeAvatarData) {
        try {
            const user = await this.userApi.updateAvatar(data);
            store.set('user', user);
        } catch (e: any) {
            ToasterController.setFailure(e?.reason);
            console.error(e);
        }
    }

    async getAllUsers(login: string) {
        try {
            const users = await this.userApi.getUser(login);
            store.set('users', users);
        } catch (e: any) {
            ToasterController.setFailure(e?.reason);
            console.error(e);
        }
    }
}

export default new UserController();
