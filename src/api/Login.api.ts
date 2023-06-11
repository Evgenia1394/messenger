import {BaseAPI} from "./base-api";
import {HTTPTransport} from "../utils/HTTPTransport";


const loginAPIInstance = new HTTPTransport();

export class LoginAPI extends BaseAPI {

    requestLogin(data: ILoginRequestData) {
        return loginAPIInstance.post(`/auth/signin`, {
            timeout: 5000,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        }).then(data => {
            return (data as XMLHttpRequest).responseText === "OK" ? "OK" : JSON.parse((data as XMLHttpRequest).responseText)}
        ).catch(error => {
            console.error('Ошибка:', error);
        });
    }

}

export interface ILoginRequestData {
    login: string,
    password: string,
}
