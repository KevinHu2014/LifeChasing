import {
  USERNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
} from '../actions/type';

const INITAL_STATE = {
  email: '',
  username: '',
  password: '',
  showDialog: false,
};

const auth = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

export default auth;
