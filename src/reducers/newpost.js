import { ACTIONS } from "../constants";

const initialState = {
  data: [],
  isPostSubmitted: false,
  isPostUpdated: false,
};

export default function reducer(state = initialState, action) {
  const {
    SUBMIT_POST_SUCCESS,
    SUBMIT_POST_FAILURE,
    LOAD_A_POST_SUCCESS,
    LOAD_A_POST_FAILURE,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE,
  } = ACTIONS;

  switch (action.type) {
    case SUBMIT_POST_SUCCESS:
      console.log (action.data, "ini data")
      window.location.href = '/posts'
      return { isPostSubmitted: action.data };
    
    case LOAD_A_POST_SUCCESS:
      return { ...state, data: action.data };
    case UPDATE_POST_SUCCESS:
      return { ...state, data: [], isPostUpdated: action.data };
    case SUBMIT_POST_FAILURE:
    case UPDATE_POST_FAILURE:
    case LOAD_A_POST_FAILURE:
    default:
      return state;
  }
}
