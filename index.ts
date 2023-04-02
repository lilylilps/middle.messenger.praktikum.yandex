import './index.pcss';

import AuthController from './src/controllers/AuthController';

import {ChangeInfoPage} from './src/pages/changeInfo';
import {ChangePasswordPage} from './src/pages/changePassword';
import {ChatsPage} from './src/pages/chats';
import {NotFoundPage} from './src/pages/notFoundPage';
import {ProfilePage} from './src/pages/profile';
import {SignInPage} from './src/pages/signIn';
import {SignUpPage} from './src/pages/signUp';
import Router from './src/utils/router';

export enum Routes {
    SignIn = '/',
    SignUp = '/signUp',
    Profile = '/profile',
    Chats = '/chats',
    ChangeInfo = '/changeInfo',
    ChangePassword = '/changePassword',
    NotFoundPage = '/404'
}
  
window.addEventListener('DOMContentLoaded', async () => {
    Router
        .use(Routes.SignIn, SignInPage)
        .use(Routes.SignUp, SignUpPage)
        .use(Routes.Profile, ProfilePage)
        .use(Routes.Chats, ChatsPage)
        .use(Routes.ChangeInfo, ChangeInfoPage)
        .use(Routes.ChangePassword, ChangePasswordPage)
        .use(Routes.NotFoundPage, NotFoundPage);

    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case Routes.SignIn:
        case Routes.SignUp:
            isProtectedRoute = false;
        break;
    }

    if (Object.values(Routes).includes(window.location.pathname as Routes)) {
        try {
            await AuthController.fetchUser();
    
            Router.start();
    
            if (!isProtectedRoute) {
                Router.go(Routes.Chats);
            }
        } catch (e) {
            if (window.location.pathname !== '/')
                window.location.pathname = '/';
        
            Router.start();
            if (isProtectedRoute) {
                Router.go(Routes.SignIn);
            }
        }
    } else {
        Router.start();
        Router.go(Routes.NotFoundPage);
    }
});
