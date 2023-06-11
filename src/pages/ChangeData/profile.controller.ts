import {HTTPTransport} from "../../utils/HTTPTransport";

const profileAPIInstance = new HTTPTransport();

export class ProfileController {
    public ChangeProfileRequest(data: IChangeProfileRequestData) {
        return profileAPIInstance.put(`/user/profile`, {
            timeout: 5000,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        })
            .then(data => JSON.parse((data as XMLHttpRequest).responseText))
            .catch(error => {console.error('Ошибка:', error);})
    }

    public ChangePasswordRequest(data: IChangePasswordRequestData) {
        return profileAPIInstance.put(`/user/password`, {
            timeout: 5000,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
        })
            .then(data => {
                return (data as XMLHttpRequest).responseText === "OK" ? "OK" : JSON.parse((data as XMLHttpRequest).responseText)})
            .catch(error => {console.error('Ошибка:', error);})
    }

    public changeAvatarRequest(formData: FormData) {
        return profileAPIInstance.put(`/user/profile/avatar`, {
            timeout: 5000,
            data: formData
        })
            .then(data => JSON.parse((data as XMLHttpRequest).responseText))
            .catch(error => {console.error('Ошибка:', error);})
    }
}

export interface IChangeProfileRequestData {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
}

export interface IChangePasswordRequestData {
    oldPassword: string,
    newPassword: string,
}
