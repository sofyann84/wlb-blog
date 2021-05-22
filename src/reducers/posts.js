import { ACTIONS } from "../constants";

const initialState = {
  data: [],
  totalData: 0,
  isDeleted: false,
};

export default function reducer(state = initialState, action) {
  const {
    LOAD_POSTS_LIST_SUCCESS,
    LOAD_POSTS_LIST_FAILURE,
    DELETE_POST_LIST,
    DELETE_POST_LIST_SUCCESS,
    DELETE_POST_LIST_FAILURE,
  } = ACTIONS;

  switch (action.type) {
    case LOAD_POSTS_LIST_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        totalData: action.data.meta.totalCount,
      };
    case DELETE_POST_LIST:
      const deletedData = state.data.data.filter(
        (item) => item.id !== action.id
      );
      return { ...state, data: deletedData };
    case DELETE_POST_LIST_SUCCESS:
      return { ...state, isDeleted: action.data };
    case LOAD_POSTS_LIST_FAILURE:
    case DELETE_POST_LIST_FAILURE:
    default:
      return state;
  }
}