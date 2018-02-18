import * as ActionTypes from './AppActionTypes';

const initState = {
  masterData: {
    markets: [],
    countries: [],
    marketCountries: [],
    currencies: [],
    feeDefinitions: [],
    feeModeDefinitions: [],
    orderStatusDefinitions: [],
    orderTypeDefinitions: []
  }
};

const reducers = (state = initState, action) => {
  var newState = {...state};

  switch (action.type) {
    case ActionTypes.APP_SET_DATA:
      newState.masterData = {...newState.masterData, ...action.data};
    break;
  }

  return newState;
};

export default reducers;
