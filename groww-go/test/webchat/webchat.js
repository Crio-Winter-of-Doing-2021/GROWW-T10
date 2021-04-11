import React from 'react';
import { WEBCHAT } from 'src/constants/constants';
import { v4 as uuidv4 } from 'uuid'
import { useWebchat, useStorageState } from 'src/hooks/hooks';
import { RequestContext, WebchatContext } from 'src/context/contexts';
import { deserializeRegex, stringifyWithRegexs } from 'src/utils/regexs';
import { WebchatMessageList } from 'src/components/message-list';
import TriggerButton from 'src/components/chatbot/TriggerButton';
import { WebchatReplies } from 'src/components/chatbot/replies';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GrowwIcon from 'src/assets/GrowwIcon.svg';


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


export const Webchat = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const {
        webchatState,
        addMessage,
        addMessageComponent,
        updateMessage,
        updateReplies,
        updateLatestInput,
        updateLastRoutePath,
        toggleWebchat,
        setError,
        clearMessages,
    } = props.webchatHooks || useWebchat()

    const storage = props.storage === undefined ? localStorage : props.storage
    const storageKey =
        typeof props.storageKey === 'function'
            ? props.storageKey()
            : props.storageKey

    const [botonicState, saveState] = useStorageState(
        storage,
        storageKey || WEBCHAT.DEFAULTS.STORAGE_KEY
    )

    // const saveWebchatState = webchatState => {
    //     storage &&
    //         saveState(
    //             JSON.parse(
    //                 stringifyWithRegexs({
    //                     messages: webchatState.messagesJSON,
    //                     lastRoutePath: webchatState.lastRoutePath,
    //                     lastMessageUpdate: webchatState.lastMessageUpdate,
    //                 })
    //             )
    //         )
    // }

    const sendInput = async input => {
        if (!input || Object.keys(input).length == 0) return
        if (!input.id) input.id = uuidv4()
        const messageComponent = messageComponentFromInput(input)
        if (messageComponent) addMessageComponent(messageComponent)
        sendUserInput(input)
        updateLatestInput(input)
        updateReplies(false)
    }

    const sendUserInput = async input => {
        props.onUserInput &&
            props.onUserInput({
                input: input,
                lastRoutePath: webchatState.lastRoutePath,
            })
    }

    React.useEffect(() => {
        if (!webchatState.isWebchatOpen) return
    }, [webchatState.isWebchatOpen])

    React.useEffect(() => {
        let {
            messages,
            lastRoutePath,
            lastMessageUpdate,

        } = botonicState || {}
    }, [])

    useImperativeHandle(ref, () => ({
        addBotResponse: ({ response, lastRoutePath }) => {
            if (Array.isArray(response)) response.map(r => addMessageComponent(r))
            else if (response) addMessageComponent(response)
            if (lastRoutePath) updateLastRoutePath(lastRoutePath)
        },
        addUserMessage: message => sendInput(message),
        openWebchat: () => toggleWebchat(true),
        closeWebchat: () => toggleWebchat(false),
        toggleWebchat: () => toggleWebchat(!webchatState.isWebchatOpen),
        setError,
        getMessages: () => webchatState.messagesJSON,
        clearMessages: () => {
            clearMessages()
            updateReplies(false)
        },
        getLastMessageUpdate: () => webchatState.lastMessageUpdate,
        updateMessageInfo: (msgId, messageInfo) => {
            const messageToUpdate = webchatState.messagesJSON.filter(
                m => m.id == msgId
            )[0]
            const updatedMsg = merge(messageToUpdate, messageInfo)
            if (updatedMsg.ack === 1) delete updatedMsg.unsentInput
            updateMessage(updatedMsg)
        },
    }))


    const sendPayload = async payload => {
        if (!payload) return
        const input = { type: INPUT.POSTBACK, payload }
        await sendInput(input)
    }

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
                updateMessage,
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
                                toggleWebchat(true)
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