import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar';
import { SENDERS, WEBCHAT } from '../constants';
import { WebchatContext } from '../contexts';
import { Reply } from './reply';

const useStyles = makeStyles((theme) => ({
    botMessage: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderRadius: '5px 15px 15px 15px',
        padding: '5px 10px',
    },
    userMessage: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '15px 15px 5px 15px',
        color: '#fff',
        padding: '5px 10px',
        flexGrow: 0,
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    listAvatar: {
        minWidth: 30
    },
}));



export const Message = props => {
    const classes = useStyles();
    let { from = SENDERS.bot, children } = props

    const { updateReplies } = React.useContext(WebchatContext)
    const replies = React.Children.toArray(children).filter(e => e.type === Reply)

    let textChildren = React.Children.toArray(children).filter(
        e => ![Reply].includes(e.type)
    )
    const isFromBot = from === SENDERS.bot

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
        updateReplies(replies)
    }, [])



    return (
        <ListItem disableGutters alignItems="flex-start">
            {isFromBot ? (
                <React.Fragment>
                    <ListItemAvatar className={classes.listAvatar}>
                        <Avatar alt="Bot Logo" className={classes.small} src={WEBCHAT.DEFAULTS.LOGO} />
                    </ListItemAvatar>
                    <ListItemText className={classes.botMessage} primary={textChildren} />
                </React.Fragment>
            ) : (               
                <ListItemText className={classes.userMessage} primary={textChildren} /> 
            )
            }
        </ListItem>
    )
}
