import React from 'react';
import { WebchatContext } from '../contexts';
import Chip from '@material-ui/core/Chip';

export const Reply = props => {
    const { sendPayload } = React.useContext(WebchatContext)
    const handleClick = event => {
        event.preventDefault()
        let payload = null;
        if (props.children) {
            if (props.path) {
                payload = { path: props.path }
            }
            sendPayload(payload)
        }
    }
    return (
        <Chip
            label={props.children}
            clickable onClick={e => handleClick(e)}
            color="secondary"
            variant="outlined" />
    );
}