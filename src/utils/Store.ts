import {set} from './helpers';
import {EventBus} from './EventBus';
import Block from './Block';
import isEqualObjects from './isEqualObjects';

import {ChatInfo} from '../api/ChatsAPI';

import {Message} from '../controllers/MessagesController';
import {ToasterStatus} from '../controllers/ToasterController';

import {User} from '../models/user';

export enum StoreEvents {
  	Updated = 'updated'
}

interface State {
	user: User;
	chats: ChatInfo[];
	messages: Record<number, Message[]>;
	selectedChat?: number;
	users: User[];
	chatUsers: User[];
	canLoadMoreChats: boolean;
	canLoadMoreMessages: Record<number, boolean>;
	toaster: {
		text: string,
		status: ToasterStatus,
	}
}

export class Store extends EventBus {
	private state: any = {};

	public set(keypath: string, data: unknown) {
		set(this.state, keypath, data);

		this.emit(StoreEvents.Updated, this.getState());
	}

	public getState() {
		return this.state;
	}

	public clear(): void {
		this.state = {};
	}
}

const store = new Store();

export function withStore<SP extends Partial<any>>(mapStateToProps: (state: State) => SP) {
	return function wrap<P>(Component: typeof Block<SP & P>) {
		return class WithStore extends Component {

			constructor(props: Omit<P, keyof SP>) {
				let previousState = { ...mapStateToProps(store.getState()) };

				super({ ...(props as P), ...previousState });

				store.on(StoreEvents.Updated, () => {
					const stateProps = mapStateToProps(store.getState());

					if (isEqualObjects(previousState, stateProps)) {
						return;
					}

					previousState = { ...stateProps };

					this.setProps({ ...previousState });
				});

			}

		};

  	};
}

export default store;
