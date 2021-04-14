import React from 'react';

const BotContext = React.createContext({
    setRoute: text => { },
    updateUserSession: user => { }
});

export default BotContext;