import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: 'white',

        '&:hover': {
            color: 'green',
            textDecoration: 'none',
        },
    }
}));

export default function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Blog
          </Typography>
                    <Link to="/" className={classes.link}>
                        <Button color="inherit">Home</Button>
                    </Link>
                    <Link to="/posts" className={classes.link}>
                        <Button color="inherit">Posts</Button>
                    </Link>

                    <Link to="/newpost" className={classes.link}>
                        <Button color="inherit">NewPost</Button>
                    </Link>
                    <Link to="/login" className={classes.link}>
                        <Button color="inherit">Login</Button>
                    </Link>

                </Toolbar>
            </AppBar>
        </div>
    );
}
