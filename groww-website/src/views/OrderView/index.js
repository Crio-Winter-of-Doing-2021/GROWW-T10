import React from 'react';
import BotContext from 'src/contexts/BotContext';

export default function OrderView() {


    const Bot = React.useContext(BotContext);

    React.useEffect(() => {
        Bot.setRoute('Orders');
    }, [Bot])
    return <div>Orders</div>
}