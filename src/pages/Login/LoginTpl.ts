import "../../styles/loginStyles.scss";

export const loginTpl = `
        <main class="login">
        <div class="login__wrapper">
            <div class="login__content">
                <div>
                    <div class="login__title">Вход</div>
                    <form class="login__fields">
                        {{{loginInput}}}
                        {{{passwordInput}}}
                    </form>
                </div>
                <div class="login__buttons">
                    {{{authorizeButton}}}
                     {{{registrationButton}}}
                </div>
            </div>
            </div>
        </main>
    `
