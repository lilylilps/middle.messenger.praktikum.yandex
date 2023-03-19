import ChatsController from './ChatsController';
import ToasterController from './ToasterController';

import WebSocketTransport, {WebSocketTransportEvents} from '../utils/WebSocketTransport';
import store from '../utils/Store';

export interface Message {
	id: number;
	chat_id: number;
	time: string;
	type: string;
	user_id: number;
	content: string;
	is_read: boolean;
	file?: {
		id: number;
		user_id: number;
		path: string;
		filename: string;
		content_type: string;
		content_size: number;
		upload_date: string;
	}
}

class MessagesController {
	private sockets: Map<number, WebSocketTransport> = new Map();

	async connect(id: number, token: string) {
		if (this.sockets.has(id)) {
			return;
		}

		const userId = store.getState().user.id;

		const wsTransport = new WebSocketTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);

		this.sockets.set(id, wsTransport);

		try {
			await wsTransport.connect();
		
			this.subscribe(wsTransport, id);
			this.fetchOldMessages(id);
		} catch (e: any) {
			ToasterController.setFailure(e?.reason);
			console.error(e);
		}
	}

	sendMessage(id: number, message: string) {
		const socket = this.sockets.get(id);

		if (!socket) {
			throw new Error(`Chat ${id} is not connected`);
		}

		socket.send({
			type: 'message',
			content: message,
		});
	}

	sendFile(id: number, fileId: number) {
		const socket = this.sockets.get(id);

		if (!socket) {
			throw new Error(`Chat ${id} is not connected`);
		}

		socket.send({
			type: 'file',
			content: fileId,
		});
	}

	fetchOldMessages(id: number) {
		const socket = this.sockets.get(id);

		if (!socket) {
			throw new Error(`Chat ${id} is not connected`);
		}

		socket.send({type: 'get old', content: '0'});
	}

	fetchMessages(id: number, offset: number) {
		const socket = this.sockets.get(id);

		if (!socket) {
			throw new Error(`Chat ${id} is not connected`);
		}

		socket.send({type: 'get old', content: `${offset}`});
	}

	closeAll() {
		Array.from(this.sockets.values()).forEach(socket => socket.close());
	}

	private onMessage(id: number, messages: Message | Message[]) {
		let messagesToAdd: Message[] = [];

		if (Array.isArray(messages)) {
			messagesToAdd = [...messages];
		} else {
			messagesToAdd.push(messages);
		}

		const currentMessages = ((store.getState().messages || {})[id] || []) as Message[];
		const lastMessage = messagesToAdd[0];

		const currentUser = store.getState().user.id;

		const canLoadMoreMessages = messagesToAdd.length === 20 ? true : false;

		const oldestCurrenMessage = currentMessages[currentMessages.length - 1] || {} as Message;

		const oldestCurrenMessageTime = new Date(oldestCurrenMessage.time);
		const lastMessageTime = new Date(lastMessage?.time);

		if (lastMessageTime < oldestCurrenMessageTime) {
			messagesToAdd = [...currentMessages, ...messagesToAdd];
		} else {
			const messagesToAddCount = lastMessage?.user_id !== currentUser
				? messagesToAdd.filter(message => !message.is_read).length
				: 0;
				
			ChatsController.updateChatMessages(id, lastMessage?.content, messagesToAddCount);

			messagesToAdd = [...messagesToAdd, ...currentMessages];
		}

		store.set(`canLoadMoreMessages.${id}`, canLoadMoreMessages);
		store.set(`messages.${id}`, messagesToAdd);
	}

	private onClose(id: number) {
		this.sockets.delete(id);
	}

	private subscribe(transport: WebSocketTransport, id: number) {
		transport.on(WebSocketTransportEvents.Message, (message) => this.onMessage(id, message));
		transport.on(WebSocketTransportEvents.Close, () => this.onClose(id));
	}
}

export default new MessagesController();
