import * as ActionTypes from "./NavigationActionTypes";

export function setSetSelectedTab(tabIndex) {
  return {
    type: ActionTypes.NV_SET_SELECTED_TAB,
    tabIndex
  };
}

export function hideModal(name) {
  return {
    type: ActionTypes.NV_HIDE_MODAL,
    name
  };
}

export function displayModal(name) {
  return {
    type: ActionTypes.NV_DISPLAY_MODAL,
    name
  };
}
