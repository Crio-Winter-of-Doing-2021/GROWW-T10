import React from 'react'
import { WebchatContext } from '../contexts'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    styledMessages: {
        display: 'flex',
        overflowX: 'hidden',
        flexDirection: 'column',
        flex: 'none',
        whiteSpace: 'pre',
        wordWrap: 'break-word',
    }
}));

export const WebchatMessageList = props => {
    const classes = useStyles();
    const { webchatState } = React.useContext(WebchatContext)

    return (
        <div>
            {webchatState.messagesComponents.map((e, i) => (
                <div className={classes.styledMessages} key={i}>
                    {e}
                </div>
            ))}
        </div>
    )
}
