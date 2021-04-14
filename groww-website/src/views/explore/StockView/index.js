import React, {
    useState,
    useEffect,
    useCallback
} from 'react';
import {
    Box,
    Container,
    makeStyles,
    Typography
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

export default function Stock() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [stocks, setStocks] = useState(null);
    const Bot = React.useContext(BotContext);

    const getStocks = useCallback(() => {
        axios
            .get('/api/stocks/all')
            .then((response) => {
                if (isMountedRef.current) {
                    console.log(response.data);
                    setStocks(response.data.stocks);
                }
            });
    }, [isMountedRef]);

    React.useEffect(() => {
        getStocks();
    }, [getStocks]);

    React.useEffect(() => {
        Bot.setRoute('KYC_Status');
        Bot.setRoute('Stocks');
    }, [Bot])

    if (!stocks) {
        return null;
    }

    return (
        <Page
            className={classes.root}
            title="Explore Stocks - Groww"
        >
            <Container maxWidth={false}>
                {stocks && (
                    <Results stocks={stocks} />
                )}
            </Container>
        </Page>
    );
}