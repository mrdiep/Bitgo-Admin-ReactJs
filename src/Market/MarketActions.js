import * as ActionTypes from "./MarketActionTypes";

export function displayFeeConfiguration(marketId, feeId, feeModeId) {
    return {
        type: ActionTypes.M_DISPLAY_MARKET_FEE_CONFIGURATION,
        feeModeId,
        feeId,
        marketId,
    }
}

export function hideFeeConfiguration() {
    return {
        type: ActionTypes.M_HIDE_MARKET_FEE_CONFIGURATION,
    }
}

export function setFeeId(feeId) {
    return {
        type: ActionTypes.M_SET_MARKET_FEE_ID,
        feeId
    }
}


export function setFeeModeId(feeModeId) {
    return {
        type: ActionTypes.M_SET_MARKET_FEE_MODE_ID,
        feeModeId
    }
}

export function showCurrencyEditor(currency) {
    return {
        type: ActionTypes.M_DISPLAY_CURRENCY_CONFIGURATION,
        currency
    }
}

export function hideCurrencyEditor() {
    return {
        type: ActionTypes.M_HIDE_CURRENCY_CONFIGURATION,
    }
}

export function setCurrencyConfigurationValue(key, value) {
    return {
        type: ActionTypes.M_SET_CURRENCY_CONFIGURATION_VALUE,
        key,
        value
    }
}