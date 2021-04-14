import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SvgIcon from '@material-ui/core/SvgIcon';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import LogoDark from 'src/components/LogoDark';
import Account from './Account';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        height: 72
    },
    title: {
        paddingLeft: 16,
        flexGrow: 1,
    },
    logo: {
        marginRight: theme.spacing(3)
    },
    link: {

        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2)

    },
    search: {
        width: theme.breakpoints.width("sm"),
        textAlign: 'center',
        marginLeft: theme.spacing(2),
        marginRight: 'auto'
    }
}));

function TopBar({ className, ...rest }) {
    const classes = useStyles();

    return (
        <AppBar color="default" position="static" {...rest}>
            <Toolbar className={classes.toolbar}>
                <RouterLink to="/app">
                    <LogoDark className={classes.logo} />
                </RouterLink>
                <Link
                    className={classes.link}
                    color="primary"
                    component={RouterLink}
                    to="/app/explore/stocks"
                    underline="none"
                    variant="body1"
                >
                    Explore
                </Link>
                <Link
                    className={classes.link}
                    color="textPrimary"
                    component={RouterLink}
                    to="/app/investments"
                    underline="none"
                    variant="body1"
                >
                    Investments
                </Link>

                <TextField
                    className={classes.search}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SvgIcon
                                    fontSize="small"
                                    color="action"
                                >
                                    <SearchIcon />
                                </SvgIcon>
                            </InputAdornment>
                        )
                    }}

                    placeholder="Search Stocks and Mutual Funds"
                    variant="outlined"
                />
                <Account />
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;