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

export default function FixedDeposit() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [fixedDeposits, setFixedDeposits] = useState(null);
    const Bot = React.useContext(BotContext);

    const getFixedDeposits = useCallback(() => {
        axios
            .get('/api/fixed-deposits/all')
            .then((response) => {
                if (isMountedRef.current) {
                    setFixedDeposits(response.data.fixedDeposits);
                }
            });
    }, [isMountedRef]);

    React.useEffect(() => {
        Bot.setRoute('KYC_Status');
        Bot.setRoute('Fixed Deposits');
    }, [Bot])

    useEffect(() => {
        getFixedDeposits();
    }, [getFixedDeposits]);

    if (!fixedDeposits) {
        return null;
    }

    return (
        <Page
            className={classes.root}
            title="Explore Stocks - Fixed Deposits"
        >
            <Container maxWidth={false}>
                {fixedDeposits && (
                    <Results fixedDeposits={fixedDeposits} />
                )}
            </Container>
        </Page>
    );
}
