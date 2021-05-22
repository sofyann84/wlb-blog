import gql from "graphql-tag";

import { ACTIONS } from "../constants";
import { client } from "../configs/service";

const isLoading = (data) => ({
  type: ACTIONS.IS_LOADING,
  data,
});

const deleteIsLoading = (data) => ({
  type: ACTIONS.DELETE_IS_LOADING,
  data,
});

const loadPostsListSuccess = (data) => ({
  type: ACTIONS.LOAD_POSTS_LIST_SUCCESS,
  data,
});

const loadPostsListFailure = () => ({
  type: ACTIONS.LOAD_POSTS_LIST_FAILURE,
});

export const loadPostsList = (page) => {
  const query = gql`
    query($options: PageQueryOptions) {
      posts(options: $options) {
        data {
          id
          title
        }
        meta {
          totalCount
        }
      }
    }
  `;
  const variables = {
    options: {
      paginate: {
        page,
        limit: 9,
      },
    },
  };
  return (dispatch) => {
    dispatch(isLoading(true));
    return client
      .query({ query, variables })
      .then(({ data }) => {
        dispatch(loadPostsListSuccess(data.posts));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loadPostsListFailure());
      })
      .finally(() => {
        dispatch(isLoading(false));
      });
  };
};

export const deletePostListSuccess = (data) => ({
  type: ACTIONS.DELETE_POST_LIST_SUCCESS,
  data,
});

const deletePostListFailure = () => ({
  type: ACTIONS.DELETE_POST_LIST_FAILURE,
});

const deletePostListRedux = (id) => ({
  type: ACTIONS.DELETE_POST_LIST,
  id,
});

export const deletePostList = (id) => {
  const mutation = gql`
    mutation($id: ID!) {
      deletePost(id: $id)
    }
  `;
  return (dispatch) => {
    dispatch(deleteIsLoading(true));
    return client
      .mutate({ mutation, variables: { id } })
      .then(({ data }) => {
        dispatch(deletePostListSuccess(data.deletePost));
        dispatch(deletePostListRedux(id));
      })
      .catch((err) => {
        dispatch(deletePostListFailure(err));
      })
      .finally(() => {
        dispatch(deleteIsLoading(false));
      });
  };
};
