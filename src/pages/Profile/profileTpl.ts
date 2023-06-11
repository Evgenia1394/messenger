import "../../styles/profileStyles.scss";

export const profileTpl = `
       <main class="profile">
           <div class="profile__wrapper">
               <div class="profile__content">
                {{{avatarInput}}}
               <div class="profile__name">{{{titleName}}}</div>
                        <div class="profile__fields">
                           {{{emailField}}}
                           {{{loginField}}}
                           {{{firstNameField}}}
                           {{{secondNameField}}}
                           {{{chatNameField}}}
                           {{{phoneNumberField}}}
                        </div>
                        <div class="profile__back">{{{backButton}}}</div>
                   <div class="profile__buttons">
                       {{{btnChangeProfile}}}
                       {{{btnChangePassword}}}
                       {{{btnExit}}}
                   </div>
               </div>
           </div>
       </main>
    `
