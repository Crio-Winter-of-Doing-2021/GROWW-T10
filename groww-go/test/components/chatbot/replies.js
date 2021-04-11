import React from 'react'

import { WebchatContext } from 'src/context/contexts';
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
        <div
            className={classes.repliesContainer}
            justify={justifyContent}
            wrap={flexWrap}
            style={{
                ...props.style,
            }}
        >
            {webchatState.replies.map((r, i) => (
                <div key={i}>{r}</div>
            ))}
        </div>
    )
}
