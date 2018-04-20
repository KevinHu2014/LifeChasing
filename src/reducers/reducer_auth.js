import {
  USERNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  DIALOG_TYPE,
  SIGN_UP_SUCCESS,
} from '../actions/type';

const INITAL_STATE = {
  email: '',
  username: '',
  password: '',
  showDialog: false,
  errorTitle: '',
  errorMessage: '',
};

const auth = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case DIALOG_TYPE:
      return {
        ...state,
        showDialog: action.payload.type,
        errorTitle: action.payload.errorTitle,
        errorMessage: action.payload.errorMessage,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        ...INITAL_STATE,
      };
    default:
      return state;
  }
};

export default auth;
