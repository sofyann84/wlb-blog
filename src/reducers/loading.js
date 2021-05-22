import { ACTIONS } from "../constants";

const initialState = {
  isLoading: false,
  submitIsLoading: false,
  deleteIsLoading: false,
};

export default function reducer(state = initialState, action) {
  const { IS_LOADING, SUBMIT_IS_LOADING, DELETE_IS_LOADING } = ACTIONS;

  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.data };
    case SUBMIT_IS_LOADING:
      return { ...state, submitIsLoading: action.data };
    case DELETE_IS_LOADING:
      return { ...state, deleteIsLoading: action.data };
    default:
      return state;
  }
}
