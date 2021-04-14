import React from 'react';
import BotContext from 'src/contexts/BotContext';


export default function MutualFundPageView(){


    const Bot = React.useContext(BotContext);

    React.useEffect(() => {
        Bot.setRoute('Mutual Funds');
    }, [Bot])
    return <div>MutualFund Page View</div>
}