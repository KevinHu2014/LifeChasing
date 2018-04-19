import {
  USERNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  DIALOG_TYPE,
} from './type';

export const usernameChanged = text => ({
  type: USERNAME_CHANGED,
  payload: text,
});

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text,
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text,
});

export const dialogType = (type, errorTitle, errorMessage) => ({
  type: DIALOG_TYPE,
  payload: { type, errorTitle, errorMessage },
});
