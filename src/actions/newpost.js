import gql from "graphql-tag";

import { client } from "../configs/service";
import { ACTIONS } from "../constants";

const isLoading = (data) => ({
  type: ACTIONS.IS_LOADING,
  data,
});

const submitIsLoading = (data) => ({
  type: ACTIONS.SUBMIT_IS_LOADING,
  data,
});

export const submitPostSuccess = (data) => ({
  type: ACTIONS.SUBMIT_POST_SUCCESS,
  data
});

const submitPostFailure = () => ({
  type: ACTIONS.SUBMIT_POST_FAILURE,
});

export const submitPost = (title, body) => {
  const mutation = gql`
    mutation($input: CreatePostInput!) {
      createPost(input: $input) {
        id
        title
        body
      }
    }
  `;
  const variables = {
    input: { title, body },
  };
  return (dispatch) => {
    dispatch(submitIsLoading(true));
    return client
      .mutate({ mutation, variables })
      .then(() => {
        console.log('success')
        dispatch(submitPostSuccess(true));
      })
      .catch((err) => {
        dispatch(submitPostFailure(err));
        console.log('error euy')
      })
      .finally(() => {
        dispatch(submitIsLoading(false));
      });
  };
};

const loadAPostSuccess = (data) => ({
  type: ACTIONS.LOAD_A_POST_SUCCESS,
  data,
});

const loadAPostFailure = () => ({
  type: ACTIONS.LOAD_A_POST_FAILURE,
});

export const loadAPost = (id) => {
  const query = gql`
    query {
      post(id: ${id}) {
        id
        title
        body
      }
    }
  `;
  return (dispatch) => {
    dispatch(isLoading(true));
    return client
      .query({ query })
      .then(({ data }) => {
        dispatch(loadAPostSuccess(data.post));
      })
      .catch(() => {
        dispatch(loadAPostFailure());
      })
      .finally(() => {
        dispatch(isLoading(false));
      });
  };
};

export const updatePostSuccess = (data) => ({
  type: ACTIONS.UPDATE_POST_SUCCESS,
  data,
});

const updatePostFailure = () => ({
  type: ACTIONS.UPDATE_POST_FAILURE,
});

export const updatePost = (id, body) => {
  const mutation = gql`
    mutation($id: ID!, $input: UpdatePostInput!) {
      updatePost(id: $id, input: $input) {
        id
        body
      }
    }
  `;
  const variables = { id, input: { body } };
  return (dispatch) => {
    dispatch(submitIsLoading(true));
    client
      .mutate({ mutation, variables })
      .then(() => {
        dispatch(updatePostSuccess(true));
      })
      .catch((err) => {
        dispatch(updatePostFailure(err));
      })
      .finally(() => {
        dispatch(submitIsLoading(false));
      });
  };
};
