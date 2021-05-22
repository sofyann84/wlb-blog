import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        width:"100px",
        height:"100px",
        backgroundColor:"red"
        },
}));
export default function Component(props) {
    const classes = useStyles()
    const { isOpen, children } = props;

  if (isOpen) {
    return (
      <div className={classes.modal}>
        <span>{children}</span>
        <div className="modal__body">{children}</div>
      </div>
    );
  } else {
    return <></>;
  }
}
