import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { logout } from 'src/actions/account';
import { makeStyles } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import BotContext from 'src/contexts/BotContext';


const useStyles = makeStyles((theme) => ({
    avatar: {
        height: 32,
        width: 32,
        backgroundColor: 'transparent'
    },
    button: {
        marginLeft: theme.spacing(2)
    }
}));

function Account() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const Bot = React.useContext(BotContext);

    const handleLogout = async () => {
        await dispatch(logout());
        Bot.updateUserSession(null);
    }

    React.useEffect(() => {
        Bot.updateUserSession(account.user);
    }, [account.user])

    const handleOrder = () => {
        history.push('/app/orders');
    };
    const handleLogin = () => {
        history.push('/');
    };
    return (
        <>
            { account.user ?
                <React.Fragment>
                    <Tooltip title="Notifications">
                        <IconButton
                            color="default"

                        >
                            <SvgIcon >
                                <NotificationsNoneOutlinedIcon />
                            </SvgIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Wallet">
                        <IconButton
                            color="default"

                        >
                            <SvgIcon >
                                <AccountBalanceWalletOutlinedIcon />
                            </SvgIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Order Cart">
                        <IconButton
                            color="default"
                        >
                            <SvgIcon >
                                <ShoppingCartOutlinedIcon />
                            </SvgIcon>
                        </IconButton>
                    </Tooltip>


                    <Tooltip title="Orders">
                        <Button
                            variant="outlined"
                            className={classes.button}
                            onClick={handleOrder}
                            startIcon={<DescriptionOutlinedIcon />} >
                            Orders
                        </Button>
                    </Tooltip>
                    <Tooltip title="Logout">
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.button}
                            onClick={handleLogout}
                            endIcon={<ExitToAppIcon />} >
                            Logout
                        </Button>
                    </Tooltip>

                </React.Fragment>
                : <React.Fragment>
                    <Tooltip title="Login">
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Tooltip>
                </React.Fragment>
            }
        </>
    );
}

export default Account;

