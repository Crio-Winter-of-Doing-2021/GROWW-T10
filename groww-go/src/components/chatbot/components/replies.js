import React from 'react'

import { WebchatContext } from '../contexts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    replyContainer: {
        flex: 'none',
        display: 'inline-block',
        margin: '3px'
    },
    repliesContainer: {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingBottom: '10px',
        marginLeft: '5px',
        marginRight: '5px',
    }
}));

export const WebchatReplies = props => {
    const classes = useStyles();
    const { webchatState } = React.useContext(WebchatContext)

    return (
        <div className={classes.repliesContainer} >
            {webchatState.replies.map((r, i) => (
                <div className={classes.replyContainer} key={i}>{r}</div>
            ))}
        </div>
    )
}
