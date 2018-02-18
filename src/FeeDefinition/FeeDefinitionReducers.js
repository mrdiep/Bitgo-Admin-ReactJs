import * as ActionTypes from "./FeeDefinitionActionTypes";
import { fromJS } from 'immutable';

const initState = {
  marketApplyForm: {
    isShow: false,
    markets: [],
  },
  feeForm: {
    isShow: false,
    isAddingForm: true,
    id: '',
    name: '',
    description: '',
    values: [{
        name: 'PGODiscountRate',
        display: "PGO Discount",
        value: 0
      },
      {
        name: 'MarketBuyerRate',
        display: "Market Buyer",
        value: 0
      },
      {
        name: 'MarketSellerRate',
        display: "Market Seller",
        value: 0
      },
      {
        name: 'LimitBuyerRate',
        display: "Limit Buyer",
        value: 0
      },
      {
        name: 'LimitSellerRate',
        display: "Limit Seller",
        value: 0
      },
      {
        name: 'MarketTakerRate',
        display: "Market Taker",
        value: 0
      },
      {
        name: 'LimitTakerRate',
        display: "Limit Taker",
        value: 0
      },
      {
        name: 'LimitMakerRate',
        display: "Limit Maker",
        value: 0
      }
    ]
  }
};

const reducers = (state = initState, action) => {
  var newState = fromJS(state).toJS();

  switch (action.type) {
    case ActionTypes.MK_F_DISPLAY_FEE_DEFINITION_FORM:
      newState.feeForm.isShow = true;  
      if (action.data) {
          newState.feeForm.isAddingForm = false;
          newState.feeForm.id = action.data.id;
          newState.feeForm.name = action.data.name;
          newState.feeForm.description = action.data.description;

          for (var feeItem of newState.feeForm.values) {
            feeItem.value = action.data[feeItem.name] * 100;
          }
      } else {
        newState.feeForm.isAddingForm = true;
      }
      break;

    case ActionTypes.MK_F_HIDE_FEE_DEFINITON_FORM:
      newState.feeForm.isShow = false;
      break;

    case ActionTypes.MK_F_DISPLAY_FEE_MARKETS_FORM:
      newState.marketApplyForm.isShow = true;
      newState.marketApplyForm.markets = action.markets
      .map(x=> { return  { 
          id: x.id,
          name: x.name,
          selected: action.feeMarkets.some(t=>t.id === x.id),
          feeModeId: x.feeModeId
        }});
      break;

    case ActionTypes.MK_F_HIDE_FEE_MARKETS_FORM:
      newState.marketApplyForm.isShow = false;
      break;

    case ActionTypes.MK_F_SET_VALUE:
      newState.feeForm.values.filter(x => x.name === action.name)[0].value = action.value;

      break;
    case ActionTypes.MK_F_SET_NAME:
      newState.feeForm.name = action.name;

      break;

    case ActionTypes.MK_F_SET_DESCRIPTION:
      newState.feeForm.description = action.description;

      break;

    case ActionTypes.MK_F_SET_MARKET_FEE_MODE:
      const item = newState.marketApplyForm.markets.filter(x=>x.name === action.name)[0];
      item.feeModeId = action.feeModeId;
      break;
  }

  return newState;
};

export default reducers;