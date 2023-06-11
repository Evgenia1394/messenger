import "../../styles/dialogPreviewStyles.scss";

export const DialogPreviewTpl = `
        <div class="dialog-preview">
        <img class="dialog-preview__icon" src="{{avatar}}">
        <div class="dialog-preview__description">
            <div class="dialog-preview__name">
            {{name}}{{id}}
            </div>
            <div class="dialog-preview__message">
            {{text}}
            </div>
        </div>
        <div class="dialog-preview__details">
             <div class="dialog-preview__time">
            {{time}}
            </div>
            {{{deleteBtn}}}
            <div class="dialog-preview__circle">
                <div class="dialog-preview__count">
                {{count}}
                </div>
            </div>
        </div>
        </div>
    `
