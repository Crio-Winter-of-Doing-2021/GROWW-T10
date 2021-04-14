import React, {
    useState,
    useEffect,
    useCallback
} from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Results from './Results';
import BotContext from 'src/contexts/BotContext';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100%',
        paddingBottom: 100
    }
}));

export default function USStock() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [stocks, setStocks] = useState(null);
    const Bot = React.useContext(BotContext);


    const getStocks = useCallback(() => {
        axios
            .get('/api/us-stocks/all')
            .then((response) => {
                if (isMountedRef.current) {
                    setStocks(response.data.stocks);
                }
            });
    }, [isMountedRef]);
    React.useEffect(() => {
        Bot.setRoute('KYC_Status');
        Bot.setRoute('US Stocks');
    }, [Bot])

    useEffect(() => {
        getStocks();
    }, [getStocks]);

    if (!stocks) {
        return null;
    }

    return (
        <Page
            className={classes.root}
            title="Explore US Stocks - Groww"
        >
            <Container maxWidth={false}>
                {stocks && (
                    <Results stocks={stocks} />
                )}
            </Container>
        </Page>
    );
}

