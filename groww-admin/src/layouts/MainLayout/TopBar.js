import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Logo from 'src/components/Logo';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        height: 64
    },
    title: {
        paddingLeft: 16,
        flexGrow: 1,
    },
}));

function TopBar({ className, ...rest }) {
    const classes = useStyles();

    return (
        <AppBar className={clsx(classes.root, className)} color="default" position="static" {...rest}>
            <Toolbar className={classes.toolbar}>
                <Logo />
                <Typography variant="h5" color="primary" className={classes.title}>
                    Groww-Go Conversation Management
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;