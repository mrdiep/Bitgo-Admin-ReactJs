import * as ActionTypes from "./NavigationActionTypes";

const initState = {
  tabIndex: 0,
  modals: { }
};

const reducers = (state = initState, action) => {
  var newState = {...state}

  switch (action.type) {
    case ActionTypes.NV_SET_SELECTED_TAB:
      newState.tabIndex = action.tabIndex;
      break;
    case ActionTypes.NV_DISPLAY_MODAL:
      newState.modals[action.name] = true;
      break;
    case ActionTypes.NV_HIDE_MODAL:
      newState.modals[action.name] = false;
      break;
  }

  return newState;
};

export default reducers;