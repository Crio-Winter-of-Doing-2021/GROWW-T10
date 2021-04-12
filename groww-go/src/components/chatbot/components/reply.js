import React from 'react';
import { WebchatContext } from '../contexts';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';


const useStyles = makeStyles((theme) => ({
    chip: {
        margin: '2px 2px',
       borderRadius: '30px',
       textTransform: 'none'
    }

}));

export const Reply = props => {
    const classes = useStyles();
    const { sendText } = React.useContext(WebchatContext)
    const handleClick = event => {
        event.preventDefault()
        let payload = null;
        if (props.children) {
            if (props.path) {
                payload = { path: props.path }
            }
            sendText(props.children, payload)
        }
    }
    return (
        <Zoom in={true}>
        <Button variant="outlined" color="secondary" className={classes.chip} onClick={handleClick}>
            {props.children}
        </Button>
        </Zoom >

    );
}