import React, { useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { submitPostSuccess } from "../actions/newpost";
import Modal from "../Modal";
import { submitPost, loadAPost, updatePost } from "../actions/newpost";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  form_control: {
    width: '100%'
  },
  form__text_editor: {
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px'
  },
  form__submit__btn: {
    backgroundColor: '#3f51b5',
    color: 'white',
    "&:hover": {
      backgroundColor: "#3f51b5",
      textDecoration: "none"
    }
  },
  link: {
    "&:hover": {
      backgroundColor: "inherit",
      textDecoration: "none"
    }
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
export default function Newpost(props) {
  const classes = useStyles()
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/");
  const pathLength = path.length - 1;
  const id = path[pathLength];
  const editPath = path[2];

  const isLoading = false
  const submitIsLoading = useSelector((state) => state.loading.submitIsLoading);
  const data = useSelector((state) => state.newpost.data);
  const isPostSubmitted = useSelector(
    (state) => state.newpost.isPostSubmitted
  );

  const [modal, setModal] = React.useState({ isActive: false, id: "" });
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { title: "", body: "" }
  );

  const toggle = (id) => {
    setModal({ isActive: !modal.isActive, id });
    dispatch(submitPostSuccess(false));
  };

  useEffect(() => {
    if (editPath === "edit") {
      dispatch(loadAPost(id));
      setInputValues({ title: data.title, body: data.body });
    }
   
  }, [dispatch, data]);

  const _handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ [name]: value });
  };

  const _handleOnSubmit = (e) => {
    const { title, body } = inputValues;
    e.preventDefault();
    if (editPath === "edit") {
      dispatch(updatePost(id, body));
    } else {
      dispatch(submitPost(title, body));

    }

    setInputValues({ title: "", body: "" });
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
      </div>
    );
  }

  return (
    <Container maxWidth="sm" className={classes.container}>
      <div className="page-title">
        <h4>{editPath === "edit" ? "Edit A Post" : "Add New Post"}</h4>
      </div>

      <form className="form" onSubmit={_handleOnSubmit}>
        <div className="form__group">
          <TextField
            id="filled-basic"
            label="Title"
            name="title"
            type="text"
            variant="filled"
            className={classes.form_control}
            placeholder="Title"
            onChange={_handleOnChange}
            value={inputValues.title}
            disabled={editPath === "edit" ? true : false}
          />
        </div>
        <div className="form__group">
          <TextField
            id="body"
            label="Body"
            multiline
            rows={20}
            variant="filled"
            name="body"
            type="text"
            className={classes.form__text_editor}
            onChange={_handleOnChange}
            value={inputValues.body}
          />
        </div>
        <div className="form__submit">
          <Button
            type="submit"
            className={classes.form__submit__btn}
            disabled={submitIsLoading}
            variant="contained">{submitIsLoading ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </form>
      <Modal isOpen={modal.isActive} children="New Post Created!">
        {isPostSubmitted ? (
          <>
            <i className="far fa-check-circle modal__icon-success"></i>
            <p>"New Post Created!
            </p>
            <button className="modal__button" onClick={toggle}>
              Ok
            </button>
          </>
        ) : ""}
      </Modal>
    </Container>
  );
}
