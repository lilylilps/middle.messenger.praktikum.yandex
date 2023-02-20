import {ChangeInfoPage} from '../pages/changeInfo';
import {ChangePasswordPage} from '../pages/changePassword';
import {ProfilePage} from '../pages/profile';
import {SignInPage} from '../pages/signIn';
import {SignUpPage} from '../pages/signUp';

const ROUTES = {
    changeInfo: ChangeInfoPage,
    changePassword: ChangePasswordPage,
    profile: ProfilePage,
    signUp: SignUpPage,
    signIn: SignInPage,
}

export function renderDOM(route: keyof typeof ROUTES) {
    const root = document.querySelector('#root')!;

    root.innerHTML = '';

    const PageComponent = ROUTES[route];
    const page = new PageComponent();
  
    root.append(page.getContent()!);
    page.dispatchComponentDidMount();
}
