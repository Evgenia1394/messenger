import "../../styles/pageErrorStyles.scss";

export const pageErrorTpl404 = `
        <main class="page-error">
            <div class="page-error__content">
                <div class="page-error__number">404</div>
                <div class="page-error__description">Такой страницы не существует</div>
               {{{backButton}}}
            </div>
        </main>
    `
