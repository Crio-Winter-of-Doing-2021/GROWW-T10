import React from 'react';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    },
}));

export default function TriggerButton() {
    const classes = useStyles();
    return (
        <Fab className={clsx(classes.root)} color="primary">
            Hi
        </Fab>
    )
}