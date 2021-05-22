//import React, { useEffect, useState } from "react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
//import FavoriteIcon from "@material-ui/icons/Favorite";
//import MoreVertIcon from "@material-ui/icons/MoreVert";
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles(() => ({
    root: { maxwidth: 365, height: 360,display:'flex',flexDirection:'column' ,marginTop:'20px',},
    title:{
width:"100%",
height:'40%',
marginBottom:'20px',
marginTop:'20px',
fontSize : '1rem'

    },
    body:{
        width:"100%",
        height:'40%'
    },

    action:{
        width:"100%",
        height:'10%'
    },

    media: {
        height: 0,
        paddingTop: "56.25%",
    },
}));

export default function CardPreview(props) {
    const classes = useStyles();
    //const { title, body, id } = props
    const { title, body} = props
    return (
        <Card className={classes.root}>
            <CardHeader
            className={classes.title}
                title={title}
                subheader={
                    new Date(+new Date() - Math.floor(Math.random() * 10000000000))
                        .toISOString()
                        .split("T")[0]
                }
            />

            <CardContent className={classes.body}>
                <Typography variant="body2" color="textSecondary" component="p">
                    {body}
                </Typography>
            </CardContent>

            <CardActions className={classes.action} disableSpacing>
                <IconButton aria-label="add to favorites">
                    <VisibilityIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
