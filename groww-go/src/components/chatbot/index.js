import React from 'react';
import { routes } from '../../routes';
import { actions } from '../../actions';
import { WebChat } from './webchat';
import { ReactBot } from './helper';
import { Text} from './components/text';


export const Chatbot = () => {
    const ref = React.createRef();

    const bot = new ReactBot({
        actions,
        defaultRoutes: [
            {
                path: '404',
                action: "NotFound", // eslint-disable-line
            },
        ],
        routes
    })

    const handleClick = () => {
        sendPayload("hi");
    }


    const sendPayload = (path) => {
        ref.current.sendPayload({ path});
    }
    return (
        <React.Fragment>
        <WebChat
            ref={ref}
            bot={bot}
            onInit={handleClick}
            onOpen={() => console.log('Bot Opened!')}
            onClose={() => console.log('Bot Closed!')}
        />
        </React.Fragment>
    );
}