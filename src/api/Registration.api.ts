import {BaseAPI} from "./base-api";
import {HTTPTransport} from "../utils/HTTPTransport";


const registrationAPIInstance = new HTTPTransport();

export class RegistrationAPI extends BaseAPI {

    requestRegistration(data: IRegistrationRequestData) {
        return registrationAPIInstance.post(`/auth/signup`, {
            timeout: 5000,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        })
            .then(data => JSON.parse((data as XMLHttpRequest).responseText))
            .catch(error => {console.error('Ошибка:', error);})
    }
}

export interface IRegistrationRequestData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
}



