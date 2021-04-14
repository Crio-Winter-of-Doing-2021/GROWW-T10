import React from 'react';
import BotContext from 'src/contexts/BotContext';


export default function FixedDepositPageView(){


    const Bot = React.useContext(BotContext);

    React.useEffect(() => {
        Bot.setRoute('Fixed Deposits');
    }, [Bot])
    return <div>FixedDeposit Page View</div>
}