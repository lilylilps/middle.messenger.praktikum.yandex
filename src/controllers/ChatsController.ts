import chatsApi, { ChangeChatAvatarData, ChatInfo, ChatsAPI } from '../api/ChatsAPI';
import resourceApi, { ResourceAPI } from '../api/ResourceAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';

//TODO: wrap on try/catch
class ChatsController {
  private readonly chatsApi: ChatsAPI;
  private readonly resourceApi: ResourceAPI;

  constructor() {
    this.chatsApi = chatsApi;
    this.resourceApi = resourceApi;
  }

  async create(title: string) {
    await this.chatsApi.create(title);

    this.fetchChats();
  }

  async fetchChats(data?: any) {
    const chats = await this.chatsApi.read(data || {});

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    for (const chat of chats) {
      if (chat.avatar) {
        const chatImage = await this.resourceApi.read(chat.avatar);
    
        const imageObjectUrl = URL.createObjectURL(chatImage);
        chat.avatar = imageObjectUrl;
      }
    }

    store.set('chats', chats);
  }

  addUserToChat(id: number, userId: number) {
    this.chatsApi.addUsers(id, [userId]);
  }

  deleteUserFromChat(id: number, userId: number) {
    this.chatsApi.deleteUsers(id, [userId]);
  }

  async getChatUsers(id: number) {
    const chatUsers = await this.chatsApi.getUsers(id);

    store.set('chatUsers', chatUsers);
  }

  async updateAvatar(data: ChangeChatAvatarData) {
    try {
      const chat = await this.chatsApi.updateAvatar(data);
      
      const imageObjectUrl = URL.createObjectURL(data.avatar);
      chat.avatar = imageObjectUrl;

      const chats = store.getState().chats as ChatInfo[];

      const chatIndex = chats.findIndex(ch => ch.id === data.id);
      chats[chatIndex] = {...chats[chatIndex], avatar: chat.avatar};

      store.set('chats', {...chats});
    } catch (e: any) {
      console.error(e);
    }
  }

  updateChatMessages(id: number, content: string, count: number) {
    const chats = store.getState().chats as ChatInfo[];

	if (!chats) return;

    const chatIndex = chats.findIndex(ch => ch.id === id);
    // TODO: поправить логику со счетчиком
    chats[chatIndex] = 
      {...chats[chatIndex], last_message: {...chats[chatIndex].last_message, content}, unread_count: count};

    store.set('chats', {...chats});
  }

  async delete(id: number) {
    await this.chatsApi.delete(id);

    this.fetchChats();
  }

  getToken(id: number) {
    return this.chatsApi.getToken(id);
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
    const chats = store.getState().chats as ChatInfo[] || [];

    const chatIndex = chats.findIndex(ch => ch.id === id);
    chats[chatIndex] = 
      {...chats[chatIndex], unread_count: 0};

    store.set('chats', {...chats});
  }
}

export default new ChatsController();
