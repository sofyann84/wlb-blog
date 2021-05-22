import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import HomeItem from "../containers/home/homeItem";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "../actions/home";

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import PaginationView from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'35px',
        marginBottom:'20px',
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Home() {
    const classes = useStyles();

    const dispatch = useDispatch()
    const [pagination, setPagination] = useState({ current: 1 });

    const totalData = useSelector((state) => state.home.totalData);
    const { data } = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(loadPosts(pagination.current));
    }, [dispatch, pagination]);
    console.log(data)
    const _handleOnPagination = (e) => {
        const { innerText } = e.target;
        if (innerText === "Prev") {
            setPagination({ current: pagination.current - 1 });
        } else if (innerText === "Next") {
            setPagination({ current: pagination.current + 1 });
        } else {
            setPagination({ current: Number(innerText) });
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalData / 9); i++) {
        pageNumbers.push(i);
    }

    return (
        < Container maxWidth="lg">
            <Grid container spacing={3}>
                {data.map(({ title, body, id }, i) => {
                    return (
                        <Grid item xs={8} sm={4} key={i}>
                            <HomeItem url="https://source.unsplash.com/featured/?city" title={title} body={body} id={id} />
                        </Grid>
                    )
                })}

            </Grid>
            <div className={classes.root}>
                <PaginationView count={Math.ceil(totalData/9)} variant="outlined" color="primary" onClick={_handleOnPagination}/>
            </div>
        </Container>
    );
}
