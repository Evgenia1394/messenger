import "../../styles/pageErrorStyles.scss";

export const pageErrorTpl500 = `
        <main class="page-error">
            <div class="page-error__content">
                <div class="page-error__number">500</div>
                <div class="page-error__description">Что-то пошло не так ...</div>
               {{{backButton}}}
            </div>
        </div>
    `
