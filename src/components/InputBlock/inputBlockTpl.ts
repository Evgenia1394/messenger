import "../../styles/commonStyles.scss";

export const inputTpl = `
        <div class="text-field">
            <label class="text-field__label" for={{name}}>{{label}}</label>
            <input class="text-field__input" 
            type={{type}} 
            name={{name}}
            id={{id}} 
            placeholder={{placeholder}} 
            value={{value}}>
            <span id="not-valid" class={{id}}></span>
        </div>
    `
