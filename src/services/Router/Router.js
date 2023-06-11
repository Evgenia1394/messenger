/**
 go — переходит на нужный роут и отображает нужный блок;
 back — возвращает в прошлое состояние и показывает блок, соответствующий тому состоянию;
 forward — переходит в следующие состояние и показывает соответствующий блок;
 use — регистрирует блок по пути в роут и возвращает себя — чтобы можно было выстроить в цепочку;
 start — по событию onpopstate запускает приложение.
*/
import Route from "./Route";

export class Router {
    constructor(rootQuery) {
        //проверка на синглтон
        this.routes = [];
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];

        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname, block) {
        // Чтобы избавить роутер от прямого взаимодействия с блоком, можно ввести ещё один слой абстракции
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        // Возврат this — основа паттерна "Builder" («Строитель»)
        return this;
    }


    start() {
        window.onpopstate = event => {
            event.preventDefault()
            this._onRoute(event.currentTarget.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
       this.history.back();
       return window.location.replace(document.referrer)
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname) {
        //заменила match
        return this.routes.find(route => route._pathname === pathname);
    }

}

export default Router;
