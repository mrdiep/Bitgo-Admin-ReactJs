import * as ActionTypes from "./ReportActionTypes";

export function setData(data) {
  return {
    type: ActionTypes.RP_SET_DATA,
    data
  };
}
