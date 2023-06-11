import "../../styles/changeDataStyles.scss";

export const changeDataTpl = `
       <main class="change-data">
       <div class="change-data__wrapper">
       <div class="change-data__content">
              {{{avatarInput}}}
       <div class="change-data__name">{{{titleName}}}</div>
            <form class="change-data__form" id="change_data">
                  <div class="change-data__fields">
                        {{{emailInput}}}
                        {{{loginInput}}}
                        {{{firstNameInput}}}
                        {{{secondNameInput}}}
                        {{{chatNameInput}}}
                        {{{phoneNumberInput}}}
                    </div>
                    {{{btn}}}
                </form>
       </div>
       </div>
       </main>
    `
