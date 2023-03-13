import {User} from './AuthAPI';
import BaseAPI from './BaseAPI';

export interface ChangeProfileData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

export interface ChangeAvatarData {
    avatar: File;
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  updateProfile(data: ChangeProfileData): Promise<User> {
    return this.http.put('/profile', data);
  }

  updateAvatar(data: ChangeAvatarData): Promise<User> {
    const formData = new FormData();
    formData.append('avatar', data.avatar);
    return this.http.put('/profile/avatar', formData, 'multipart/form-data');
  }

  updatePassword(data: ChangePasswordData) {
    return this.http.put('/password', data);
  }

  read = undefined;
  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new UserAPI();
