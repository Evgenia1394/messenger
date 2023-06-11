import Block from "../utils/Block";
import Store, {StoreEvents} from "./store";

export function connect(Component: typeof Block, mapStateToProps: (state: any) => any) {
    // используем class expression
    return class extends Component {
        constructor(props: any) {
            super({...props, ...mapStateToProps(Store.getState())});
            // подписываемся на событие
            Store.on(StoreEvents.Updated, () => {
                // вызываем обновление компонента, передав данные из хранилища
                this.setProps({...mapStateToProps(Store.getState())});
            });
        }
    }
}

