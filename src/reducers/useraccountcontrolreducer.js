import {
  SAVE_PASS_KEY,
  SHOW_LOGIN_ERROR,
  SHOW_REGISTER_ERROR,
  COMPLETE_REGISTRAION,
  CLEAR_PASS_KEY
} from '../actions/types';

const initialState = {
  PASSKEY: '',
  ALERTMESSAGE: '',
  ISLOGGEDIN: false
};

export const PASS_KEY_REDUCER = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PASS_KEY:
      return {
        PASSKEY: action.PASSKEY,
        ALERTMESSAGE: '',
        ISLOGGEDIN: true
      }
    case CLEAR_PASS_KEY:
      return {
        PASSKEY: '',
        ALERTMESSAGE: '',
        ISLOGGEDIN: false
      }
    case SHOW_LOGIN_ERROR:
      return {
        ...state,
        ALERTMESSAGE: action.ALERTMESSAGE
      }
    default:
      return state;
  }
}

export const REGISTRATION_REDUCER = (state = {
  ALERTMESSAGE: '',
  REGISTERED: false
}, action) => {
  switch (action.type) {
    case SHOW_REGISTER_ERROR:
      return {
        ...state,
        ALERTMESSAGE: action.ALERTMESSAGE,
      }
    case COMPLETE_REGISTRAION:
      return {
        ALERTMESSAGE: '',
        REGISTERED: true
      }
    default:
      return state;
  }
}