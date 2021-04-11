import React from 'react';
import { routes } from '../../routes';
import { WebChat } from './webchat';
import { ReactBot } from './helper';
import { Text} from './components/text';


export const Chatbot = () => {
    const ref = React.createRef();

    const bot = new ReactBot({
        defaultRoutes: [
            {
                path: '404',
                action: () => <Text>I don't understand you</Text>, // eslint-disable-line
            },
        ],
        routes
    })

    const handleClick = (event) => {
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
            onInit={()=> console.log('Bot Initialized!')}
            onOpen={() => console.log('Bot Opened!')}
            onClose={() => console.log('Bot Closed!')}
        />
        <button onClick={handleClick}>Click me!</button>
        </React.Fragment>
    );
}