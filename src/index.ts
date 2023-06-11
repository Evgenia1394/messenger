import Router from './services/Router/Router.js';
import Store from "./Store/store";
import {UserController} from "./user.controller";
import {AllRoutes} from "./services/Router/RegisterRoutes";
import {IErrorReason, IUser} from "./api/profile.api";

let isLogged: boolean;
new UserController().getUser()
    .then((data: IUser | IErrorReason) => {
        return data
    }).then((user: IUser | IErrorReason) => {
    if ((user as IErrorReason).reason) {
        isLogged = false;
    } else {
        Store.set('user', user)
        isLogged = true;
    }
}).then(() => {getComponent(window.location.pathname, isLogged)})

let router = new Router('.app');
for (const route in AllRoutes) {
    router.use(route, AllRoutes[route]);
}
router.start();


const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css?family=Open+Sans';
link.type = 'text/css';
document.head.appendChild(link);

function getComponent(pathname: string, isLogged: boolean) {
    switch (pathname) {
        case '/page-error404':
            return router.go('/page-error404');
        case '/page-error500':
            return router.go('/page-error500');
        case '/login':
            return router.go('/login');
        case '/registration':
            return router.go('/registration');
        case '/profile':
            return router.go('/profile');
        case '/change-data':
            return router.go('/change-data');
        case '/change-password':
            return router.go('/change-password');
        case '/messages':
            return router.go('/messages');
        case '/messages/:id':
            return router.go('/messages/:id');
        default:
            if (!isLogged) {
                return router.go('/login');
            } else {
                return router.go('/messages');
            };
    }
}
