import { combineReducers } from "redux";
import AppReducer from "./App/AppReducer";
import NavigationReducer from "./Navigation/NavigationReducers";
import MarketReducer from './Market/MarketReducers';
import ReportReducer from './Report/ReportReducers';
import LoginReducer from './Login/LoginReducers';
import FeeDefinitionReducers from './FeeDefinition/FeeDefinitionReducers';

export default combineReducers({
  app: AppReducer,
  nav: NavigationReducer,
  data: combineReducers({
    feeData: FeeDefinitionReducers,
    marketData: MarketReducer
  }),
  report: ReportReducer,
  login: LoginReducer
});
