import { INPUT } from '../constants';


export const isOfType = (msgType, type) => msgType === type

export const isText = msg => isOfType(msg.type, INPUT.TEXT)
export const isPostback = msg => isOfType(msg.type, INPUT.POSTBACK)
export const isCustom = msg => isOfType(msg.type, INPUT.CUSTOM)
export const isButtonMessage = msg => isOfType(msg.type, INPUT.BUTTON_MESSAGE)
