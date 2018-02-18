import * as ActionTypes from "./MarketActionTypes";
import {
  fromJS
} from 'immutable';

const initState = {
  marketFeeConfiguration: {
    isShow: false,
    feeIdSelected: null,
    feeModeIdSelected: 1,
    marketIdSelected: null
  },
  currencyConfiguration: {
    isShow: false,
    currencyId: null,
    currencyName: '',
    withdrawFeeAmount: 1,
    withdrawFeeHolder: "diep.nguyenvan",
    withdrawMinimumAmount: 2,
    withdrawMaximumAmount: "Refer User KYC",
    depositFeeAmount: 3,
    depositFeeHolder: "duc.lamtuan",
    depositMinimumAmount: 4,
    fiatConfiguration: {
      bankName: 'Vietcombank'
    },
    cryptoConfiguration: {
      numberOfConfirm: 6,
      btc: {
        networkFee: 0.003
      },
      eth: {
        gas: 0.001,
        gasPrice: 0.002
      }
    }
  }
};

const reducers = (state = initState, action) => {
  var newStateMap = fromJS(state);

  switch (action.type) {
    case ActionTypes.M_DISPLAY_MARKET_FEE_CONFIGURATION:
      return newStateMap
        .setIn(['marketFeeConfiguration', 'isShow'], true)
        .setIn(['marketFeeConfiguration', 'feeIdSelected'], action.feeId)
        .setIn(['marketFeeConfiguration', 'feeModeIdSelected'], action.feeModeId)
        .setIn(['marketFeeConfiguration', 'marketIdSelected'], action.marketId)
        .toJS();

    case ActionTypes.M_HIDE_MARKET_FEE_CONFIGURATION:
      return newStateMap.setIn(['marketFeeConfiguration', 'isShow'], false)
        .toJS();


    case ActionTypes.M_SET_MARKET_FEE_ID:
      return newStateMap.setIn(['marketFeeConfiguration', 'feeIdSelected'], action.feeId)
        .toJS();

    case ActionTypes.M_SET_MARKET_FEE_MODE_ID:
      return newStateMap.setIn(['marketFeeConfiguration', 'feeModeIdSelected'], action.feeModeId)
        .toJS();


    case ActionTypes.M_DISPLAY_CURRENCY_CONFIGURATION:
      return newStateMap
      .setIn(['currencyConfiguration', 'isShow'], true)
      .setIn(['currencyConfiguration', 'currencyId'], action.currency.Id)
      .setIn(['currencyConfiguration', 'currencyName'], action.currency.name)
      .toJS();  


    case ActionTypes.M_HIDE_CURRENCY_CONFIGURATION:
      return newStateMap.setIn(['currencyConfiguration', 'isShow'], false)
        .toJS();

    case ActionTypes.M_SET_CURRENCY_CONFIGURATION_VALUE:
      return newStateMap.setIn(['currencyConfiguration', ...action.key.split('.')], action.value)
        .toJS();
  }

  return newStateMap.toJS();
};

export default reducers;