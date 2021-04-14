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
export default function MutualFund() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [mutual_funds, setMutualFunds] = useState(null);
    const Bot = React.useContext(BotContext);
    React.useEffect(() => {
        Bot.setRoute('KYC_Status');
        Bot.setRoute('Mutual Funds');
    }, [Bot])


    const getMutualFunds = useCallback(() => {
        axios
            .get('/api/mutual-funds/all')
            .then((response) => {
                if (isMountedRef.current) {
                    setMutualFunds(response.data.mf_schemes);
                }
            });
    }, [isMountedRef]);

    useEffect(() => {
        getMutualFunds();
    }, [getMutualFunds]);

    if (!mutual_funds) {
        return null;
    }

    return (
        <Page
            className={classes.root}
            title="Explore Mutual Funds - Groww"
        >
            <Container maxWidth={false}>
                {mutual_funds && (
                    <Results mutual_funds={mutual_funds} />
                )}
            </Container>
        </Page>
    );
}
