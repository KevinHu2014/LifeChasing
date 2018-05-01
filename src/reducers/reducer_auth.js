import {
  USERNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  DIALOG_TYPE,
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS,
  WAIT_FOR_AUTH,
} from '../actions/type';

const INITAL_STATE = {
  email: '',
  username: '',
  password: '',
  showDialog: false,
  errorTitle: '',
  errorMessage: '',
  loading: false,
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
        loading: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        ...INITAL_STATE,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        ...INITAL_STATE,
      };
    case WAIT_FOR_AUTH:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default auth;
