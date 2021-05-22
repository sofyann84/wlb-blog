import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Home from "../components/Home"
import Posts from "../components/Posts"
import NewPost from "../components/Newpost"
import Detail from "../components/Detail"
import Footer from "../components/footer"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width:"100%",
        height:"100%",
        },
}));
function Routers() {
    const classes = useStyles()
    return (
        <>
            <div className={classes.root}>
            <NavBar />
                <Switch>
                    <Route path="/post-detail">
                        <Detail />
                    </Route>
                    

                    <Route path="/posts">
                        <Posts />

                    </Route>

                    <Route path="/newpost">
                        <NewPost />

                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                    {/* <Route path="/login">
                    <NewPost/>
                </Route> */}
            
                </Switch>
                <Footer />
                
            </div>
            </>
    );
}

export default Routers;
