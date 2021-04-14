import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { colors, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import LogoLight from 'src/components/LogoLight';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm';
import BotContext from 'src/contexts/BotContext';

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'url("/static/bg-illus.png")',
        display: 'flex',
        height: '100%',
        minHeight: '100%',
        flexDirection: 'column',
    },
    card: {
        display: 'flex',
        position: 'relative',
        '& > *': {
            flexGrow: 1,
            flexBasis: '50%',
            width: '50%'
        },
        borderRadius: '10px'
    },
    content: {
        padding: theme.spacing(6, 7, 3, 7),
        textAlign: 'center'
    },
    text: {
        fontWeight: 500
    },
    icon: {
        backgroundColor: colors.green[500],
        color: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        position: 'absolute',
        top: -32,
        left: theme.spacing(3),
        height: 64,
        width: 64
    },
    media: {
        padding: theme.spacing(6, 4, 3, 4),
        color: theme.palette.common.white
    }
}));

function LoginView() {
    const classes = useStyles();
    const history = useHistory();
    const Bot = React.useContext(BotContext);

    const handleSubmitSuccess = () => {
        history.push('/app');
    };

    React.useEffect(()=>{
        Bot.setRoute('Login');
    },[])

    return (
        <Page className={classes.root} title="Login Page - Groww">
            <Container maxWidth="md">
                <Box
                    my={6}
                    display="flex"
                    justifyContent="center"
                >
                    <LogoLight />
                </Box>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image="/static/pattern.svg"
                    >
                        <Typography
                            color="inherit"
                            className={classes.text}
                            variant="h4"
                        >
                            Simple, Free  <br></br> Investing.
                        </Typography>
                    </CardMedia>
                    <CardContent className={classes.content}>
                        <Typography
                            variant="h4"
                            className={classes.text}
                            color="textPrimary"
                        >
                            Welcome to Groww
                        </Typography>
                        <Box my={3} >
                            <LoginForm onSubmitSuccess={handleSubmitSuccess} />
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Page>
    );
}

export default LoginView;
