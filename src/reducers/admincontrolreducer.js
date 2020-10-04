import {
  SAVE_PASS_KEY,
  SHOW_LOGIN_ERROR,
  CLEAR_PASS_KEY
} from "../actions/types";

const initialState = {
  passKey: "",
  alertMessage: "",
  isLoggedIn: false
};

export const PASS_KEY_REDUCER = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PASS_KEY:
      return {
        passKey: action.passKey,
        alertMessage: "",
        isLoggedIn: true
      }
    case CLEAR_PASS_KEY:
      return {
        passKey: "",
        alertMessage: "",
        isLoggedIn: false
      }
    case SHOW_LOGIN_ERROR:
      return {
        ...state,
        alertMessage: action.alertMessage
      }
    default:
      return state;
  }
};
