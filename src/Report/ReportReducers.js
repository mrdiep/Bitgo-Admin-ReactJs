import * as ActionTypes from "./ReportActionTypes";

const initState = {
  loadCounter: 0,
  executedOrders: [],
  userWallets: []
};

const reducers = (state = initState, action) => {
  var newState = {...state}

  switch (action.type) {
    case ActionTypes.RP_SET_DATA:
      newState = {...newState, ...action.data, loadCounter: newState.loadCounter + 1};
      break;
    default:
      return state;
  }

  return newState;
};

export default reducers;
