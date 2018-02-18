import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as NavigationActions from "./NavigationActions";

import { Nav, NavItem } from "adslot-ui";

const NavigationContainer = ({ tabIndex, actions }) => {
  return (
    <Nav activeKey={tabIndex} onSelect={actions.setSetSelectedTab}>
      <NavItem eventKey={0} href="#" title="Markets" className="dashboard-tab">
        Market
      </NavItem>
      <NavItem eventKey={1} title="Analytics Reporting">
        Reports
      </NavItem>
    </Nav>
  );
};

function mapStateToProps(state) {
  return {
    ...state.nav
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(NavigationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  NavigationContainer
);
