import {Main} from "../../pages/Main";
import {PageError404} from "../../pages/PageError404";
import {PageError500} from "../../pages/PageError500";
import {Login} from "../../pages/Login";
import {Registration} from "../../pages/Registration";
import {ConnectedProfile} from "../../pages/Profile";
import {ConnectedChangeData} from "../../pages/ChangeData";
import {ConnectedChangePassword} from "../../pages/ChangePassword";
import {ConnectedChatPage} from "../../pages/ChatPage";
import {ConnectedCurrentChat} from "../../pages/CurrentChat";
import Block from "../../utils/Block";

export const AllRoutes: any = {
    '/': Main,
    '/page-error404': PageError404,
    '/page-error500': PageError500,
    '/login': Login,
    '/registration': Registration,
    '/profile': ConnectedProfile,
    '/change-data': ConnectedChangeData,
    '/change-password': ConnectedChangePassword,
    '/messages': ConnectedChatPage,
    '/messages/:id': ConnectedCurrentChat,
}

export interface IAllRoutes {
    [key: string]: typeof Block;
    '/': typeof Block,
    '/page-error404': typeof Block,
    '/page-error500': typeof Block,
    '/login': typeof Block,
    '/registration': typeof Block,
    '/profile': typeof Block,
    '/change-data': typeof Block,
    '/change-password': typeof Block,
    '/messages': typeof Block,
    '/messages/:id': typeof Block,
}



