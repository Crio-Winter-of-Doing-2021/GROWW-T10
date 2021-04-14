import React from 'react';
import BotContext from 'src/contexts/BotContext';


export default function Gold (){


    const Bot = React.useContext(BotContext);

    React.useEffect(() => {
        Bot.setRoute('Gold');
    }, [Bot])
    return <div>Gold</div>
}