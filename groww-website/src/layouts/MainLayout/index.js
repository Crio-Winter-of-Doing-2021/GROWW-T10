import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from './TopBar';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function MainLayout({ children }) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <TopBar />
            <Grid
                container
                direction="row"
                justify="center"
                spacing={0}
                className={classes.root}
            >
                {children}
            </Grid>

        </React.Fragment>
    );
}

export default MainLayout;