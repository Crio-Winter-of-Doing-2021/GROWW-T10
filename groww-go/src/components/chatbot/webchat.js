import React from 'react';
import merge from 'lodash.merge';
import { v4 as uuidv4 } from 'uuid';
import { useWebChat } from './hooks';
import {
    SENDERS,
    COMPONENT_TYPE,
    ROLES,
    WEBCHAT,
    INPUT
} from './constants';
import {
    isText
} from './util/message-utils';
import { WebchatContext } from './contexts';
import TriggerButton from './components/TriggerButton';
import { Text } from './components/text';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import GrowwIcon from './assets/GrowwIcon.svg';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import { ReactBot } from './helper';


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '400px',
        height: '550px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px'
    },
    content: {
        overflowY: 'auto',
        height: '100%'
    },
    action: {
        display: 'flex',
        flexWrap: 'wrap',
        overflowY: 'auto',
        minHeight: 48,
        backgroundColor: 'white',
        justifyContent: 'center',
    }
}));


export const WebChat = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const {
        addMessage,
        addMessageComponent,
        clearMessages,
        setError,
        toggleWebchat,
        updateLastMessageDate,
        updateLastRoutePath,
        updateLatestInput,
        updateReplies,
        updateSession,
        webchatState
    } = useWebChat()
    const firstUpdate = React.useRef(true)
    const messagesEndRef = React.useRef(null)
    const currentDateString = () => new Date().toISOString();
    const { initialSession, actions, routes } = props;
    const bot = new ReactBot({
        actions,
        defaultRoutes: [
            {
                path: '404',
                action: "NotFound", // eslint-disable-line
            },
        ],
        routes
    })

    const addBotResponse = ({ response, session, lastRoutePath }) => {
        if (Array.isArray(response)) response.map(r => addMessageComponent(r))
        else if (response) addMessageComponent(response)
        if (session) updateSession(merge(session, { user: webchatState.session.user }))
        if (lastRoutePath) updateLastRoutePath(lastRoutePath)
        updateLastMessageDate(currentDateString())
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const messageComponentFromInput = input => {
        let messageComponent = null
        if (isText(input)) {
            messageComponent = (
                <Text id={input.id} from={SENDERS.user}>
                    {input.data}
                </Text>
            )
        }
        return messageComponent
    }

    const sendInput = async (input) => {
        if (!input || Object.keys(input).length === 0) return
        if (isText(input) && (!input.data || !input.data.trim())) return
        if (!input.id) input.id = uuidv4()
        const messageComponent = messageComponentFromInput(input)
        if (messageComponent) addMessageComponent(messageComponent)
        const resp = await bot.input({
            input,
            session: webchatState.session,
            lastRoutePath: webchatState.lastRoutePath
        })
        addBotResponse(resp)
        updateLatestInput(input)
        updateLastMessageDate(currentDateString())

    }

    const updateSessionWithUser = userToUpdate =>
        updateSession(merge(webchatState.session, { user: userToUpdate }));


    const sendText = async (text, payload) => {
        if (!text) return
        const input = { type: INPUT.TEXT, data: text, payload }
        await sendInput(input)
    }

    const sendPayload = async payload => {
        if (!payload) return
        const input = { type: INPUT.POSTBACK, payload }
        await sendInput(input)
    }

    React.useEffect(() => {
        if (props.onInit) setTimeout(() => props.onInit(), 100)
    }, [props])

    React.useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        }
        if (webchatState.isWebchatOpen && props.onOpen) props.onOpen()
        if (!webchatState.isWebchatOpen && props.onClose && !firstUpdate.current) {
            props.onClose()
        }
        scrollToBottom()
    }, [webchatState.isWebchatOpen, props])

    React.useEffect(() => {
        scrollToBottom()
    }, [webchatState.latestInput])

    React.useImperativeHandle(ref, () => ({
        sendPayload,
        updateUser: updateSessionWithUser,
        clearMessages: () => {
            clearMessages()
            updateReplies(false)
        },
    }));
    return (
        <WebchatContext.Provider
            value={{
                sendText,
                sendPayload,
                sendInput,
                addMessage,
                updateReplies,
                updateLatestInput,
                toggleWebchat,
                webchatState,
            }}
        >
            <div
                onClick={event => {
                    toggleWebchat(true)
                    event.preventDefault()
                }}
            >
                <TriggerButton />
            </div>

            <Slide direction="up" in={webchatState.isWebchatOpen} timeout={300}>
                <Card raised className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar alt="Groww Icon" src={GrowwIcon} />
                        }
                        action={
                            <IconButton color="primary" onClick={event => {
                                toggleWebchat(false)
                            }} aria-label="settings">
                                <CloseIcon />
                            </IconButton>
                        }
                        title={
                            <Typography variant="h5" color="primary">Groww-Go</Typography>
                        }
                    />
                    <Divider />
                    <CardContent className={classes.content} >
                        <List>
                            {webchatState.messagesComponents &&
                                webchatState.messagesComponents.map((e, i) => (
                                    <React.Fragment key={i}>
                                        {e}
                                    </React.Fragment>
                                ))}

                        </List>
                        <div ref={messagesEndRef} />
                    </CardContent>
                    <Divider />
                    <CardActions className={classes.action} disableSpacing>

                        {webchatState.replies &&
                            webchatState.replies.map((r, i) => (
                                <React.Fragment key={i}>{r}</React.Fragment>
                            ))}

                    </CardActions>
                </Card>
            </Slide>
        </WebchatContext.Provider>
    )

});