import * as ActionTypes from "./AppActionTypes";

export function setData(data) {
  return {
    type: ActionTypes.APP_SET_DATA,
    data
  };
}
