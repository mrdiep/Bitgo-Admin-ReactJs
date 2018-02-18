import React from "react";
import { PageTitle } from "adslot-ui";
import Navigation from "../Navigation/NavigationContainer";
import MarketView from "../Market/MarketViewContainer";
import ReportView from "../Report/ReportViewContainer";
import LoginView from '../Login/LoginViewContainer';

import { connect } from "react-redux";
var gridStyles = {
  padding: '10px'
}
const AppContainer =  ({ tabIndex, isLoggedIn }) => {
  return (
    <div style={gridStyles}>
      <PageTitle title="BitGo Admin">
        <small>Version 1</small>
      </PageTitle>

      {!isLoggedIn ? <LoginView /> : (
         <div>
           <Navigation />
          {tabIndex===0 ? (<MarketView/>) : null}
          {tabIndex===1 ? (<ReportView/>) : null}
        </div>)}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ...state.nav,
    ...state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AppContainer
);
