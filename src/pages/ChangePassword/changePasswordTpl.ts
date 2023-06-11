import "../../styles/changePasswordStyles.scss";

export const changePasswordTpl = `
<main class="change-password__wrapper">
       <div class="change-password">
       <div class="change-password__content">
              {{{avatarInput}}}
       <div class="change-password__name">{{{titleName}}}</div>
              <form class="change-password__fields">
                    {{{passwordOldInput}}}
                    {{{passwordFirstInput}}}
                    {{{passwordSecondInput}}}
                </form>
            {{{btn}}}
       </div>
       </div>
</main>
    `
