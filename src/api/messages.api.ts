import {HTTPTransport} from "../utils/HTTPTransport";
import {BaseAPI} from "./base-api";

const messagesAPIInstance = new HTTPTransport();

export class MessagesAPI extends BaseAPI {
    public requestChats() {
        return messagesAPIInstance.get(`/chats`, {
            timeout: 5000,
            headers: {
                'content-type': 'application/json'
            },
        }).then(data => {
            return JSON.parse((data as XMLHttpRequest).responseText)
        })
            .catch(error => {console.error('Ошибка:', error);})
    }

    public createChatRequest(data: ICreateChatRequestData) {
        return messagesAPIInstance.post(`/chats`, {
            timeout: 5000,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        }).then(data => {
            return (data as XMLHttpRequest).responseText === "OK"}
        ).catch(error => {
            console.error('Ошибка:', error);
        });
    }

    public deleteChatRequest(data: IChatDeleteData) {
        return messagesAPIInstance.delete(`/chats`, {
            timeout: 5000,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        }).then(data => {
            return (data as XMLHttpRequest).responseText === "OK"}
        ).catch(error => {
            console.error('Ошибка:', error);
        });
    }

    public async addUserToChatRequest(data: IPutUserToChatData) {
        await messagesAPIInstance.put(`/chats/users`, {
            timeout: 5000,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        }).then(data => {
            return (data as XMLHttpRequest).responseText === "OK"}
        ).catch(error => {
            console.error('Ошибка:', error);
        });
    }

    public async deleteUserFromChatRequest(data: IPutUserToChatData) {
            await messagesAPIInstance.delete(`/chats/users`, {
                timeout: 5000,
                headers: {
                    'content-type': 'application/json'
                },
                data: JSON.stringify(data)
            }).then(data => {
            return (data as XMLHttpRequest).responseText === "OK"}
        ).catch(error => {
            console.error('Ошибка:', error);
        });
    }

    public searchUserByLoginRequest(login: ISearchUserData) {
        return messagesAPIInstance.post(`/user/search`, {
            timeout: 5000,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(login)
        })
        .then(data => {
            return JSON.parse((data as XMLHttpRequest).response)
        })
        .catch(error => {console.error('Ошибка:', error);})
    }

    public chatTokenRequest(id: string) {
        return messagesAPIInstance.post(`/chats/token/${id}`, {
            timeout: 5000,
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(data => {
                return JSON.parse((data as XMLHttpRequest).response).token
            })
            .catch(error => {console.error('Ошибка:', error);})
    }

    public getUnreadMessages(chatId: number | string) {
        return messagesAPIInstance.get(`/chats/new/${chatId}`, {
            timeout: 5000,
            headers: {
                'content-type': 'application/json'
            },
        }).then(data => {
            return JSON.parse((data as XMLHttpRequest).responseText)
        })
            .catch(error => {console.error('Ошибка:', error);})
    }

}

export interface ICreateChatRequestData {
    title: string
}

export interface IPutUserToChatData {
    users: number[],
    chatId: number
}

export interface IOneChatData {
    id: number,
    title?: string,
    avatar?: string,
    unread_count?: number,
    last_message: {
    user: {
        first_name?: string,
            second_name?: string,
            avatar?: string,
            email?: string,
            login?: string,
            phone?: string,
    },
    time?: string,
        content?: string,
    }
}

export interface ISearchUserData {
    login: string
}

export interface IChatDeleteData {
    chatId: string
}


