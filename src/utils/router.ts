import {ChangeInfoPage} from '../pages/changeInfo';
import {ChangePasswordPage} from '../pages/changePassword';
import {ChatsPage} from '../pages/chats';
import {ErrorPage} from '../pages/errorPage';
import {ProfilePage} from '../pages/profile';
import {SignInPage} from '../pages/signIn';
import {SignUpPage} from '../pages/signUp';

export const ROUTES = {
    changeInfo: ChangeInfoPage,
    changePassword: ChangePasswordPage,
    chats: ChatsPage,
    profile: ProfilePage,
    signUp: SignUpPage,
    signIn: SignInPage,
    error: ErrorPage
};

export function renderDOM(route: keyof typeof ROUTES) {
    const root = document.querySelector('#root')!;

    root.innerHTML = '';

    const PageComponent = ROUTES[route];
    const page = new PageComponent({});
  
    root.append(page.getContent()!);
    page.dispatchComponentDidMount();
}
