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
import { WebchatMessageList } from './components/message-list';
import TriggerButton from './components/TriggerButton';
import { WebchatReplies } from './components/replies';
import { Text } from './components/text';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GrowwIcon from './assets/GrowwIcon.svg';

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
        overflowY: 'auto'
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
    const currentDateString = () => new Date().toISOString();
    const { initialSession, bot } = props;

    const addBotResponse = ({ response, session, lastRoutePath }) => {
        if (Array.isArray(response)) response.map(r => addMessageComponent(r))
        else if (response) addMessageComponent(response)
        if (session) updateSession(merge(session, { user: webchatState.session.user }))
        if (lastRoutePath) updateLastRoutePath(lastRoutePath)
        updateLastMessageDate(currentDateString())
    }

    const messageComponentFromInput = input => {
        let messageComponent = null
        if (isText(input)) {
            messageComponent = (
                <Text id={input.id} payload={input.payload} from={SENDERS.user}>
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
        updateReplies(false)
    }

    const updateSessionWithUser = userToUpdate =>
        updateSession(merge(webchatState.session, { user: userToUpdate }));


    const sendText = async text => {
        if (!text) return
        const input = { type: INPUT.TEXT, data: text }
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
    }, [webchatState.isWebchatOpen,props])

    React.useImperativeHandle(ref, () => ({
        sendPayload,
        updateUser: updateSessionWithUser,
        clearMessages: () => {
            clearMessages()
            updateReplies(false)
        },
    }));

    const webchatMessageList = () => (
        <WebchatMessageList style={{ flex: 1 }}>
        </WebchatMessageList>
    )
    const webchatReplies = () => <WebchatReplies replies={webchatState.replies} />

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
            {!webchatState.isWebchatOpen && (
                <div
                    onClick={event => {
                        toggleWebchat(true)
                        event.preventDefault()
                    }}
                >
                    <TriggerButton />
                </div>
            )}
            {webchatState.isWebchatOpen && (
                <Card variant="outlined" className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar alt="Groww Icon" src={GrowwIcon} />
                        }
                        action={
                            <IconButton onClick={event => {
                                toggleWebchat(false)
                                event.preventDefault()
                            }} aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={
                            <Typography variant="h5" color="primary">Groww-Go</Typography>
                        }
                    />
                    <CardContent className={classes.content} >
                        {webchatMessageList()}
                        {webchatState.replies &&
                            Object.keys(webchatState.replies).length > 0 &&
                            webchatReplies()}
                    </CardContent>
                </Card>
            )}
        </WebchatContext.Provider>
    )

});