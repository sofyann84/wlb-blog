import { ACTIONS } from "../constants";

const initialState = {
  data: [],
  totalData: 0,
};

export default function reducer(state = initialState, action) {
  const { LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE } = ACTIONS;

  switch (action.type) {
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        totalData: action.data.meta.totalCount,
      };
    case LOAD_POSTS_FAILURE:
    default:
      return state;
  }
}
