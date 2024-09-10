import { SAVE_COD_DETAILS } from '../actions/codActions';

export const codDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_COD_DETAILS:
      return { ...state, codDetails: action.payload };
    default:
      return state;
  }
};
