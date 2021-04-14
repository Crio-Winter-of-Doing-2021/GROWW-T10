import GrowwLogo from '../assets/GrowwLogo.svg'

export const SENDERS = {
    bot: 'bot',
    user: 'user',
}


export const WEBCHAT = {
    DEFAULTS: {
        WIDTH: 400,
        HEIGHT: 550,
        TITLE: '',
        LOGO: GrowwLogo,
        PLACEHOLDER: 'Ask me something...',
        BORDER_RADIUS_TOP_CORNERS: '6px 6px 0px 0px',
        ELEMENT_WIDTH: 222,
        ELEMENT_MARGIN_RIGHT: 6,
        STORAGE_KEY: 'growwState',
        ID: 'groww-go-webchat',
        BUTTON_AUTO_DISABLE: false,
        BUTTON_DISABLED_STYLE: {
            opacity: 0.5,
            cursor: 'auto',
            pointerEvents: 'none',
        },
    },

}

export const ROLES = {
    HEADER: 'header',
    MESSAGE_LIST: 'message-list',
    SEND_BUTTON_ICON: 'send-button-icon',
    WEBCHAT: 'webchat',
    TRIGGER_BUTTON: 'trigger-button',
    TEXT_BOX: 'textbox',
    MESSAGE: 'message',
}

export const COMPONENT_TYPE = {
    TEXT: 'Text',
    BUTTON: 'Button',
    REPLY: 'Reply',
}

export const INPUT = Object.freeze({
    TEXT: 'text',
    POSTBACK: 'postback',
    BUTTON_MESSAGE: 'buttonmessage',
    CUSTOM: 'custom',
  })
