import gql from "graphql-tag";

import { ACTIONS } from "../constants";
import { client } from "../configs/service";

const isLoading = (data) => ({
  type: ACTIONS.IS_LOADING,
  data,
});

const loadPostDetailSuccess = (data) => ({
  type: ACTIONS.LOAD_POST_DETAIL_SUCCESS,
  data,
});

const loadPostDetailFailure = () => ({
  type: ACTIONS.LOAD_POST_DETAIL_FAILURE,
});

export const loadPostDetail = (id) => {
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
        dispatch(loadPostDetailSuccess(data.post));
      })
      .catch(() => {
        dispatch(loadPostDetailFailure());
      })
      .finally(() => {
        dispatch(isLoading(false));
      });
  };
};
