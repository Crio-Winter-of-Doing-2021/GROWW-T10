import React from 'react';
import {
    Box,
    Container,
    Divider,
    Tabs,
    Tab,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Stock from './StockView';
import MutualFund from './MutualFundView';

import FixedDeposit from './FixedDepositView';
import Gold from './GoldView';
import USStock from './USStockView';
import { useParams, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function ExploreView() {
    const classes = useStyles();
    const { pageId } = useParams();
    const history = useHistory();
    const [value, setValue] = React.useState(pageId);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        history.push(newValue);
    };

    return (
        <Page
            className={classes.root}
            title="Explore - Groww"
        >
          
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Stocks" value="stocks" />
                    <Tab label="Mutual Funds" value='mutual_funds' />
                    <Tab label="Fixed Deposits" value="fixed_deposits" />
                    <Tab label="Gold" value="gold" />
                    <Tab label="US Stocks" value="us_stocks" />
                </Tabs>
          
            <Divider />
            <Container maxWidth="lg">          
                    {value === 'stocks' && <Stock />}
                    {value === 'mutual_funds' && <MutualFund />}
                    {value === 'fixed_deposits' && <FixedDeposit />}
                    {value === 'gold' && <Gold />}
                    {value === 'us_stocks' && <USStock />}
              
            </Container>
        </Page>
    );
}

export default ExploreView;
