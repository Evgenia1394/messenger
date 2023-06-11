import "../../styles/messageStyles.scss";

export const MessageTpl = `
    <div class="message__wrapper">
        <div class="message__user-name">
               {{{userName}}}
        </div>
        <div class="message__text">
               {{{text}}}
        </div>
        <div class="message__time">
               {{{time}}}
        </div>
    </div>
    `
