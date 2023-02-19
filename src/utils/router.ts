import {SignInPage} from '../pages/SignIn';
import {SignUpPage} from '../pages/SignUp';

const ROUTES = {
    signUp: SignUpPage,
    signIn: SignInPage
}

export function renderDOM(route: keyof typeof ROUTES) {
    const root = document.querySelector('#root')!;

    root.innerHTML = '';

    const PageComponent = ROUTES[route];
    const page = new PageComponent();
  
    root.append(page.getContent()!);
    page.dispatchComponentDidMount();
}
