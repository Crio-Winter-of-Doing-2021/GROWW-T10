import React from 'react';
import BotContext from 'src/contexts/BotContext';


export default function StockPageView(){


    const Bot = React.useContext(BotContext);

    React.useEffect(() => {
        Bot.setRoute('Stocks');
    }, [Bot])
    return <div>Stock Page View</div>
}