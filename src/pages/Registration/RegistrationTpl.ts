import "../../styles/registrationStyles.scss";

export const registrationTpl = `
        <main class="registration">
        <div class="registration__wrapper">
            <div class="registration__content">
            <div>
                <div class="registration__title">Регистрация</div>
                <form class="registration__fields">
                    {{{emailInput}}}
                    {{{loginInput}}}
                    {{{firstNameInput}}}
                    {{{secondNameInput}}}
                    {{{phoneNumberInput}}}
                    {{{passwordFirstInput}}}
                    {{{passwordSecondInput}}}
                </form>
            </div>
            <div class="registration__buttons">
                {{{registrationButton}}}
                 {{{toLoginButton}}}
            </div>
            </div>
            </div>
        </main>
    `
