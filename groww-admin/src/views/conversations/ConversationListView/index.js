import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Grid from '@material-ui/core/Grid';
import { axios } from 'src/utils';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Switch from '@material-ui/core/Switch';
import SplashScreen from 'src/components/SplashScreen';
import CardActions from '@material-ui/core/CardActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const useStyles = makeStyles((theme) => ({
    addButton: {
        height: '100%',
        width: '100%',
        cursor: 'pointer'
    },
}));

function ConversationListView({ history, match }) {
    const classes = useStyles();
    const [conversations, setConversations] = React.useState(null);
    const [toggle, setToggle] = React.useState(false);
    const [uid, setUid] = React.useState("");
    const isMountedRef = useIsMountedRef();
    const toggleForm = () => {
        setToggle((toggle) => !toggle);
    };

    const handleClick = (event, id) => {
        event.preventDefault();
        history.push(`${match.url}/${id}/edit`)
    };

    const handleChange = (event) => {
        setUid(event.target.value);
    };
    const handleToggle = (value) => () => {
        const index = conversations.findIndex((conversation) => conversation.id === value);
        let newConversations = [...conversations];
        newConversations[index] = { ...newConversations[index], isActive: !newConversations[index].isActive }
        setConversations(newConversations);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/bot/conversations/new', { name: uid , isActive: false,
            routes : [{
                id: '1',
                type:'input',
                data: { label: 'input', action: 'MultiChoice', text:  },
                position: {x :0, y:0}
            }]
        })
            .then((response) => {
                const { id } = response.data;
                history.push(`${match.url}/${id}/edit`)
            })
    }

    const getConversations = React.useCallback(() => {
        axios.get('/api/bot/conversations').then((response) => {
            if (isMountedRef.current) {
                setConversations(response.data.conversations);
            }
        });
    }, [isMountedRef]);

    React.useEffect(() => {
        getConversations();
    }, [getConversations]);

    if (!conversations) {
        return <SplashScreen />
    }
    return (
        <Grid container item xs={10} spacing={2}>
            <Grid xs={3} item>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.addButton}
                    startIcon={<AddIcon />}
                    size="large"
                    onClick={toggleForm}
                >
                    <Typography variant="h6" >Add Conversation</Typography>
                </Button>
            </Grid>
            {conversations.map((conversation) => {
                return (
                    <Grid xs={3} key={conversation.id} item >
                        <Card>
                            <CardHeader
                                action={
                                    <IconButton aria-label="edit" onClick={(event) => handleClick(event, conversation.id)}>
                                        <EditRoundedIcon />
                                    </IconButton>
                                }
                                title={<Typography variant="h6" color="primary" >{conversation.name}</Typography>}
                                subheader={<Typography variant="caption" >Created At : {conversation.createdAt}</Typography>}

                            />
                            <CardActions>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            edge="end"
                                            onChange={handleToggle(conversation.id)}
                                            checked={conversation.isActive}
                                        />
                                    }
                                    label={conversation.isActive ? "Active" : "Inactive"}
                                />
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
            <Dialog open={toggle} onClose={toggleForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Conversation</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            To create new a conversation, please enter a unique identifer here.
          </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="uid"
                            name="uid"
                            label="Unique Identifer"
                            type="text"
                            fullWidth
                            value={uid}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={toggleForm} color="primary">
                            Cancel
          </Button>
                        <Button type="submit" color="primary">
                            Continue
          </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Grid>
    );
}

export default ConversationListView;