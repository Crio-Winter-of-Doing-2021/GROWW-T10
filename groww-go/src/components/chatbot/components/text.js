import React from 'react';
import { WebchatContext } from '../contexts';
import Paper from '@material-ui/core/Paper';

export const Text = props => {
    return (
       <Paper >
           {props.children}
       </Paper>
    );
}