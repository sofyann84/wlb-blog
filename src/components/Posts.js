import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { deletePostList, deletePostListSuccess, loadPostsList } from "../actions/posts";
import { submitPostSuccess, updatePostSuccess } from "../actions/newpost";
import Modal from "../Modal";
import DataTable from "../DataTable";

import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import PaginationView from '@material-ui/lab/Pagination';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));
export default function Component() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.posts.data);
  const totalData = useSelector((state) => state.posts.totalData);
  const isDeleted = useSelector((state) => state.posts.isDeleted);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const deleteIsLoading = useSelector((state) => state.loading.deleteIsLoading);
  const isPostSubmitted = useSelector(
    (state) => state.newpost.isPostSubmitted
  );
  const isPostUpdated = useSelector((state) => state.newpost.isPostUpdated);

  const [modal, setModal] = useState({ isActive: false, id: "" });
  const [pagination, setPagination] = useState({ current: 1 });
  console.log(data)
  useEffect(() => {
    dispatch(loadPostsList(pagination.current));
  }, [dispatch, pagination]);

  useEffect(() => {
    if (isPostSubmitted || isPostUpdated) {
      setModal({ isActive: true });
    }
  }, [isPostSubmitted, isPostUpdated]);

  const toggle = (id) => {
    setModal({ isActive: !modal.isActive, id });
    dispatch(deletePostListSuccess(false));
    dispatch(submitPostSuccess(false));
    dispatch(updatePostSuccess(false));
  };

  const _handleOnDelete = () => {
    dispatch(deletePostList(modal.id));
  };

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
  for (let i = 1; i <= Math.ceil(totalData / 5); i++) {
    pageNumbers.push(i);
  }

  const columns = [
    {
      dataField: "id",
      text: "No.",
      isKey: true,
    },
    {
      dataField: "title",
      text: "Title",
    },
    {
      dataField: "action",
      text: "Action",
    },
  ];

  const newData = data.map((item) => {
    const action = (
      <div className="actions">
        <Link to={`/post-detail/${item.id}`}>
          <button className="actions__btn">
            <VisibilityIcon />
          </button>
        </Link>
        <Link to={`/newpost/edit/${item.id}`}>
          <button className="actions__btn">
            <EditIcon />
          </button>
        </Link>
        <button className="actions__btn" onClick={() => toggle(item.id)}>
          <DeleteIcon />
        </button>
      </div>
    );

    return { ...item, action };
  });

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
      </div>
    );
  }

  return (
    < Container maxWidth="lg">
      <div className="page-title">
        <h4>List of Posts</h4>
      </div>

      <Modal isOpen={modal.isActive}>
        {isDeleted || isPostSubmitted || isPostUpdated ? (
          <>
            <i className="far fa-check-circle modal__icon-success"></i>
            <p>
              {isDeleted
                ? "Deleted!"
                : isPostSubmitted
                  ? "New Post Created!"
                  : isPostUpdated
                    ? "Post Updated!"
                    : null}
            </p>
            <button className="modal__button" onClick={toggle}>
              Ok
            </button>
          </>
        ) : (
          <>
            <i className="far fa-times-circle modal__icon"></i>
            <p>Are you sure?</p>
            <button
              className="modal__button"
              onClick={_handleOnDelete}
              disabled={deleteIsLoading}
            >
              {deleteIsLoading ? "Deleting..." : "Delete"}
            </button>
            <button className="modal__button" onClick={toggle}>
              Cancel
            </button>
          </>
        )}
      </Modal>

      <DataTable columns={columns} data={newData} />
      <div className={classes.root}>
        <PaginationView count={Math.ceil(totalData / 9)} variant="outlined" color="primary" onClick={_handleOnPagination} />
      </div></Container>
  );
}
