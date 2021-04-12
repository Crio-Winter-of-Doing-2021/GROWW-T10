import React from 'react';
import { routes } from '../../routes';
import { actions } from '../../actions';
import { WebChat } from './webchat';


export const Chatbot = () => {
    const ref = React.createRef();



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
            actions={actions}
            routes={routes} 
            onInit={handleClick}
            onOpen={() => console.log('Bot Opened!')}
            onClose={() => console.log('Bot Closed!')}
        />
        </React.Fragment>
    );
}