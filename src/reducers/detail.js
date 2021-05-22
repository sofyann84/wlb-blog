import { ACTIONS } from "../constants";

const initialState = {
  data: [],
};

export default function reducer(state = initialState, action) {
  const { LOAD_POST_DETAIL_SUCCESS, LOAD_POST_DETAIL_FAILURE } = ACTIONS;

  switch (action.type) {
    case LOAD_POST_DETAIL_SUCCESS:
      return { ...state, data: action.data };
    case LOAD_POST_DETAIL_FAILURE:
    default:
      return state;
  }
}
