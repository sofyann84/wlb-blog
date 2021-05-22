import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: 'sticky',
    bottom: 0
  },

  footer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "150px",
    padding: "20px 0"
  }
});


export default function footer() {
  const classes = useStyles();
  return (

    <footer className={classes.footer}>

      <p>
        Created by <strong>Sofyan</strong> &copy; Copyright 2021
    </p>
    </footer>
  );
}
