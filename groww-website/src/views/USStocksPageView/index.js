import React from 'react';
import BotContext from 'src/contexts/BotContext';


export default function USStockPageView(){


    const Bot = React.useContext(BotContext);

    React.useEffect(() => {
        Bot.setRoute('US Stocks');
    }, [Bot])
    return <div>USStock Page View</div>
}