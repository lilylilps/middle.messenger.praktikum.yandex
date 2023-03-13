import userApi, {UserAPI, ChangeProfileData, ChangePasswordData, ChangeAvatarData} from '../api/UserAPI';
import router from '../utils/Router';
import store from '../utils/Store';

export class UserController {
    private readonly userApi: UserAPI;

    constructor() {
        this.userApi = userApi;
    }

    async updateProfile(data: ChangeProfileData) {
        try {
            const user = await this.userApi.updateProfile(data);
            delete user['avatar'];
            store.set('user', user);

            router.go('/profile');
        } catch (e: any) {
            console.error(e);
        }
    }

    async updatePassword(data: ChangePasswordData) {
        try {
            await this.userApi.updatePassword(data);
            router.go('/profile');
        } catch (e: any) {
            console.error(e);
        }
    }

    async updateAvatar(data: ChangeAvatarData) {
        try {
            const user = await this.userApi.updateAvatar(data);
            
            const imageObjectUrl = URL.createObjectURL(data.avatar);
            user.avatar = imageObjectUrl;

            store.set('user', user);
        } catch (e: any) {
            console.error(e);
        }
    }
}

export default new UserController();
