import {set} from './helpers';
import {EventBus} from './EventBus';
import {ChatInfo} from '../api/ChatsAPI';
import {User} from '../api/AuthAPI';
import {Message} from '../controllers/MessagesController';
import Block from './Block';
import isEqualObjects from './isEqualObjects';

export enum StoreEvents {
  Updated = 'updated'
}

interface State {
  user: User;
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
  selectedChat?: number;
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
