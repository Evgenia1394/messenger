import "../../styles/chatPageStyles.scss";

export const chatPageTpl = `
       <main class="chat-page">
       <div class="chat-page__wrapper">
        <div class="chat-page__left">
           <div class="chat-page__search">
           <div class="chat-page__buttons">
               {{{toProfileBtn}}}
               {{{toCreateNewChatBtn}}}
           </div>
               {{{greyInput}}}
           </div>
           <div class="chat-page__messages">
                {{{chatList}}}
           </div>
           </div>
            {{{currentChat}}}
            </div>
       </div>
    `
