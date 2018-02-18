import * as ActionTypes from "./LoginActionTypes";

const initState = {
  username: 'diep',
  password: '',
  isLoggedIn: false,
};

const reducers = (state = initState, action) => {
  var newState = {...state}

  switch (action.type) {
    case ActionTypes.LI_LOGIN:
      newState.isLoggedIn = true;
      newState.password = '';

      break;

    case ActionTypes.LI_SET_USERNAME:
      newState.username = action.username;
      break;

    case ActionTypes.LI_SET_PASSWORD:
      newState.password = action.password;
      break;
  }

  return newState;
};

export default reducers;
