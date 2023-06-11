import { expect } from 'chai';
import {JSDOM} from "jsdom";
import Router from "./Router";
import sinon from "sinon";

const DOM = new JSDOM('<html><head></head><body><div id="app"></div></body></html>', {
    url: 'http://localhost'
});

describe('Router', () => {
    let originalWindow = global.window;
    let originalDocument = global.document;
    let originalHistory = global.history
    before(() => {
        // @ts-ignore
        global.window = DOM.window;
        // @ts-ignore
        global.document = DOM.window.document;
        // @ts-ignore
        global.history = DOM.window.History;
    })
    after(() => {
        // @ts-ignore
        global.window = originalWindow;
        // @ts-ignore
        global.document = originalDocument;
        // @ts-ignore
        global.history = originalHistory;
    })


    it('It should change state of history after jump to another page', () => {
        //action
        window.history.pushState({page: 'login'}, 'Login', '/login');
        window.history.pushState({page: 'registration'}, 'Register', '/registration');
        //result
        expect(window.history.length).to.eq(3);
    });

    it('It should instance of Router', () => {
        //action
        const router = new Router({})
        //result
        expect(router).to.be.an.instanceof(Router);
    });

    it('It should perform start function', () => {
        //assert
        const router = new Router({})
        //action
        const routerSpy = sinon.spy(router, 'start');
        router.start()
        //result
        expect(routerSpy.calledOnce).to.be.true;
        routerSpy.restore();
    });

    it('It should perform use function with true url', () => {
        //assert
        const router = new Router({})
        //action
        const routerSpy = sinon.spy(router, 'use');
        const block = () => {};
        const pathname = '/test'
        router.use(pathname, block)
        //result
        expect(routerSpy.calledOnceWithExactly(pathname, block))
        routerSpy.restore();
    });
});
