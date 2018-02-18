import * as ActionTypes from "./FeeDefinitionActionTypes";

export function showFeeDefinitionForm(data) {
  return {
    type: ActionTypes.MK_F_DISPLAY_FEE_DEFINITION_FORM,
    data,
  };
}

export function closeFeeDefinitionForm() {
  return {
    type: ActionTypes.MK_F_HIDE_FEE_DEFINITON_FORM,
  };
}

export function updateFeeFormValue(name, value) {
  return {
    type: ActionTypes.MK_F_SET_VALUE,
    name,
    value
  };
}

export function updateFeeName(name) {
  return {
    type: ActionTypes.MK_F_SET_NAME,
    name
  };
}

export function updateFeeDescription(description) {
  return {
    type: ActionTypes.MK_F_SET_DESCRIPTION,
    description
  };
}

export function showFeeMarketsForm(id, feeMarkets, markets) {
  return {
    type: ActionTypes.MK_F_DISPLAY_FEE_MARKETS_FORM,
    id,
    feeMarkets,
    markets
  }
}

export function hideFeeMarketsForm() {
  return {
    type: ActionTypes.MK_F_HIDE_FEE_MARKETS_FORM
  }
}

export function setMarketFeeMode(marketName, feeModeId) {
  return {
    type: ActionTypes.MK_F_SET_MARKET_FEE_MODE,
    name: marketName,
    feeModeId
  }
}