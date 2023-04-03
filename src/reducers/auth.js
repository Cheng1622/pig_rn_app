import {LOGIN_SUCCESS,LOGIN_SUCCESS_TOKEN, FORGOT_PASSWORD_USER, SET_USER_DATA, REMOVE_USER_DATA} from '../constants';

const initialState = {
  user: {},
  forgot_password_user: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, user: action.data};
    case LOGIN_SUCCESS_TOKEN:
      return {...state, token: action.data};
    case FORGOT_PASSWORD_USER:
      return {...state, forgot_password_user: action.data};
    case SET_USER_DATA:
      return {...state, user: action.data};
    case REMOVE_USER_DATA: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};
