import gql from "graphql-tag";

import { ACTIONS } from "../constants";
import { client } from "../configs/service";

const isLoading = (data) => ({
  type: ACTIONS.IS_LOADING,
  data,
});

const loadPostsSuccess = (data) => ({
  type: ACTIONS.LOAD_POSTS_SUCCESS,
  data,
});

const loadPostsFailure = () => ({
  type: ACTIONS.LOAD_POSTS_FAILURE,
});

export const loadPosts = (page) => {
  const query = gql`
    query($options: PageQueryOptions) {
      posts(options: $options) {
        data {
          id
          title
          body
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
        dispatch(loadPostsSuccess(data.posts));
      })
      .catch(() => {
        dispatch(loadPostsFailure());
      })
      .finally(() => {
        dispatch(isLoading(false));
      });
  };
};
