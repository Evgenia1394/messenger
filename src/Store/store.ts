import {EventBus} from "../utils/EventBus";
import { set } from "../utils/set"


export enum StoreEvents {
    Updated = 'updated',
}

export const initialUser = {
            display_name: 'не выбран',
            avatar: `e09d5966-5a05-4936-aeda-4443da619808/289944e0-62b8-47ff-b97c-c2d7890683a5_5.png`,
            email: 'не выбран',
            first_name: 'не выбран',
            login: 'не выбран',
            id: 'не выбран',
            phone: 'не выбран',
            second_name: 'не выбран',
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
    private state: Record<string, any> = {};

    public getState() {
        return this.state;
    }

        public set(path: string, value: unknown) {
            set(this.state, path, value);
            this.emit(StoreEvents.Updated);
        };
}

export default new Store();
