import MessagesController from './MessagesController';
import ToasterController from './ToasterController';

import chatsApi, {ChangeChatAvatarData, ChatInfo, ChatsAPI} from '../api/ChatsAPI';
import resourceApi, {Resource, ResourceAPI} from '../api/ResourceAPI';
import store from '../utils/Store';

class ChatsController {
	private readonly chatsApi: ChatsAPI;
	private readonly resourceApi: ResourceAPI;

	private offset: number = 0;

	constructor() {
		this.chatsApi = chatsApi;
		this.resourceApi = resourceApi;
	}

	async create(title: string): Promise<void> {
		try {
			await this.chatsApi.create(title);
			await this.fetchChats();
		} catch (e: any) {
			ToasterController.setFailure(e?.reason);
			console.error(e);
		}

	}

	async fetchChats(data?: any): Promise<void> {
		try {
			const chats = await this.fetch(data || {});
			this.updateLoadMore(chats);
			store.set('chats', [...chats]);
		} catch (e: any) {
			ToasterController.setFailure(e?.reason);
			console.error(e);
		}
	}

	async loadMore() {
		try {
			this.offset += 10;
			
			const chats = await this.fetch({offset: this.offset});
			const currentChats = store.getState().chats as ChatInfo[];

			this.updateLoadMore(chats);

			store.set('chats', [...currentChats, ...chats]);
		} catch (e: any) {
			this.offset -= 10;
			ToasterController.setFailure(e?.reason);
			console.error(e);
		}
	}

	async addUserToChat(id: number, userId: number): Promise<void> {
		try {
			await this.chatsApi.addUsers(id, [userId]);
			ToasterController.setSuccess('Пользователь добавлен');

			const chatUsers = await this.chatsApi.getUsers(id);
			store.set('chatUsers', chatUsers);
		} catch (e: any) {
			ToasterController.setFailure(e?.reason);
			console.error(e);
		}
	}

	async deleteUserFromChat(id: number, userId: number): Promise<void> {
		try {
			await this.chatsApi.deleteUsers(id, [userId]);
			ToasterController.setSuccess('Пользователь удален');

			const chatUsers = await this.chatsApi.getUsers(id);
			store.set('chatUsers', chatUsers);
		} catch (e: any) {
			ToasterController.setFailure(e?.reason);
			console.error(e);
		}
	}

	async updateAvatar(data: ChangeChatAvatarData): Promise<void> {
		try {
			const chat = await this.chatsApi.updateAvatar(data);

			const chats = store.getState().chats as ChatInfo[];

			const chatIndex = chats.findIndex(ch => ch.id === data.id);
			chats[chatIndex] = {...chat};

			store.set('chats', {...chats});
		} catch (e: any) {
			ToasterController.setFailure(e?.reason);
			console.error(e);
		}
	}

	updateChatMessages(id: number, content: string, count: number): void {
		const chats = store.getState().chats as ChatInfo[];

		if (!chats) return;

		const chatIndex = chats.findIndex(ch => ch.id === id);

		if (chatIndex === -1) return;

		chats[chatIndex] = {
			...chats[chatIndex],
			last_message: {
				...chats[chatIndex].last_message,
				content
			},
			unread_count: count
		};

		store.set('chats', {...chats});
	}

	async sendFiles(chatId: number, files: File[]): Promise<void> {
		const resources = [] as Resource[];
		for (const file of files) {
			try {
				const resource = await this.resourceApi.create(file);
				resources.push(resource);
			} catch (e: any) {
				ToasterController.setFailure(e?.reason);
		console.error(e);
			}
		}

		resources.forEach(resource => MessagesController.sendFile(chatId, resource.id));
	}

	async delete(id: number): Promise<void> {
		try {
			await this.chatsApi.delete(id);

			store.set('selectedChat', undefined);
			await this.fetchChats();
		} catch (e: any) {
			ToasterController.setFailure(e?.reason);
			console.error(e);
		}
	}

	async selectChat(id: number): Promise<void> {
		const chats = store.getState().chats as ChatInfo[] || [];

		const chatIndex = chats.findIndex(ch => ch.id === id);
		chats[chatIndex] = {...chats[chatIndex], unread_count: 0};

		store.set('chats', {...chats});
		store.set('selectedChat', id);

		try {
			const chatUsers = await this.chatsApi.getUsers(id);
			store.set('chatUsers', chatUsers);
		} catch (e: any) {
			ToasterController.setFailure(e?.reason);
			console.error(e);
		}
	}

	private async fetch(data?: any): Promise<ChatInfo[]> {
		const chats = await this.chatsApi.read(data || {});

		for (const chat of chats) {
			const token = await this.getToken(chat.id);
			await MessagesController.connect(chat.id, token);
		}

		return chats;
	}

	private async getToken(id: number): Promise<string> {
		return this.chatsApi.getToken(id);
	}

	private updateLoadMore(chats: ChatInfo[]): void {
		if (chats.length < 10) {
			store.set('canLoadMoreChats', false);
		} else {
			store.set('canLoadMoreChats', true);
		}  
	}
}

export default new ChatsController();
