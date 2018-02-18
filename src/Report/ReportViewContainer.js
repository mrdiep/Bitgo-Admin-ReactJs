import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ReportActions from "./ReportActions";
import * as ReportMiddlewares from "./ReportMiddlewares";

import { ControlLabel, Row, Col } from 'react-bootstrap';


import { PagedGrid, Button, Tabs, Tab, SvgSymbol, FlexibleSpacer } from "adslot-ui";

import TransactionReportView from "./TransactionReport/TransactionReportView";
import WalletReportView from "./WalletReport/WalletReportView";

const ReportViewContainer = ({
  actions,
  markets,
  countries,
  marketCountries,
  currencies,
  executedOrders,
  userWallets
}) => {
  
  return (
  <Tabs defaultActiveKey="transaction-report" animation={false} id="reportTab">
    <Tab
      eventKey="transaction-report"
      key="transaction-report"
      title={
        <span className="flexible-wrapper-inline">
          <SvgSymbol href="./svg-symbols.svg#calendar" />
          <FlexibleSpacer />
          Orders
        </span>
      }
    >
    <TransactionReportView 
      actions={actions}
      markets={markets}
      countries={countries}
      marketCountries={marketCountries}
      currencies={currencies}
      executedOrders={executedOrders}
      />
    </Tab>
    <Tab
      eventKey="fee-report"
      key="fee-report"
      title={
        <span className="flexible-wrapper-inline">
          <SvgSymbol href="./svg-symbols.svg#calendar" />
          <FlexibleSpacer />
          Fees
        </span>
      }
    >
    </Tab>
    <Tab
      eventKey="wallet-report"
      key="wallet-report"
      title={
        <span className="flexible-wrapper-inline">
          <SvgSymbol href="./svg-symbols.svg#calendar" />
          <FlexibleSpacer />
          Wallets
        </span>
      }
    >

    <WalletReportView
      actions={actions}
      markets={markets}
      countries={countries}
      marketCountries={marketCountries}
      currencies={currencies}
      userWallets={userWallets} />

    </Tab>
    <Tab
      eventKey="user-report"
      key="user-report"
      title={
        <span className="flexible-wrapper-inline">
          <SvgSymbol href="./svg-symbols.svg#calendar" />
          <FlexibleSpacer/>
          Users
        </span>
      }
    >
    </Tab>
  </Tabs>
  );
};

function mapStateToProps(state) {
  return {
    ...state.app.masterData,
    ...state.report
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ...bindActionCreators(ReportActions, dispatch),
      getExecutedOrders: () => dispatch(ReportMiddlewares.getExecutedOrders()),
      getWallets: () => dispatch(ReportMiddlewares.getWallets()),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ReportViewContainer
);
