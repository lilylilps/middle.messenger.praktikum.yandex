import BaseAPI from './BaseAPI';
import {User} from '../models/user';

export interface ChatInfo {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
		user: User,
		time: string;
		content: string;
    }
}

export interface ChangeChatAvatarData {
	id: number;
	avatar: File;
}

export class ChatsAPI extends BaseAPI {
	constructor() {
		super('/chats');
	}

	create(title: string): Promise<void> {
		return this.http.post('/', { title });
	}

	delete(id: number): Promise<void> {
		return this.http.delete('/', { chatId: id });
	}

	read(data?: any): Promise<ChatInfo[]> {
		return this.http.get('/', undefined, data);
	}

	getUsers(id: number): Promise<Array<User & { role: string }>> {
		return this.http.get(`/${id}/users`);
	}

	addUsers(id: number, users: number[]): Promise<void> {
		return this.http.put('/users', { users, chatId: id });
	}

	deleteUsers(id: number, users: number[]): Promise<void> {
		return this.http.delete('/users', { users, chatId: id });
	}

	updateAvatar(data: ChangeChatAvatarData): Promise<ChatInfo> {
		const formData = new FormData();
		formData.append('avatar', data.avatar);
		formData.append('chatId', data.id.toString());
		return this.http.put('/avatar', formData, 'multipart/form-data');
	}

	async getToken(id: number): Promise<string> {
		const response = await this.http.post<{ token: string }>(`/token/${id}`);

		return response.token;
	}

	update = undefined;
}

export default new ChatsAPI();
