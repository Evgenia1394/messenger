import Store from "./Store/store";
import {ProfileAPI} from "./api/profile.api";

export class UserController {
    public getUser() {
        if (Store.getState().user) {
            return Store.getState().user
        } else {
            return new ProfileAPI().requestUser()
                .then(data => {
                    Store.set('user', data)
                    return Store.getState().user
                })
        }
    }
}

