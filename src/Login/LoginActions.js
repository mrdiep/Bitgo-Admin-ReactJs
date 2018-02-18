import * as ActionTypes from "./LoginActionTypes";

export function login() {
  return {
    type: ActionTypes.LI_LOGIN,
  };
}


export function setUsername(username) {
  return {
    type: ActionTypes.LI_SET_USERNAME,
    username
  };
}

export function setPassword(password) {
  return {
    type: ActionTypes.LI_SET_PASSWORD,
    password
  };
}
