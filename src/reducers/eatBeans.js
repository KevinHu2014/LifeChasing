import { EAT_BEANS } from '../actions/index';

const eatBeans = (state = null, action) => {
  switch (action.type) {
    case EAT_BEANS:
      return action.beans;
    default:
      return state;
  }
};

export default eatBeans;
