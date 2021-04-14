import React from 'react';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Tooltip from '@material-ui/core/Tooltip';


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
        <Tooltip title="Help"  aria-label="help">
        <Fab className={clsx(classes.root)} color="primary">
           <ContactSupportIcon  fontSize="large"/>
        </Fab>
        </Tooltip>
    )
}