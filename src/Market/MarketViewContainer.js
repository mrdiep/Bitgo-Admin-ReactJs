import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as MarketActions from "./MarketActions";
import * as MarketMiddlewares from './MarketMiddlewares';

import {ControlLabel} from 'react-bootstrap';

import { SvgSymbol, Tabs,Tab, FlexibleSpacer, PagedGrid, Button } from "adslot-ui";
import FeeDefinitionContainer from "../FeeDefinition/FeeDefinitionContainer";
import CurrencyEditor from "./Currency/CurrencyEditorModal";
import MarketFeeEditor from './MarketFee/MarketFeeEditorModal';

const MarketViewContainer = ({ actions, markets, countries, marketCountries, currencies, feeDefinitions, feeModeDefinitions,
  marketFeeConfiguration, currencyConfiguration
}) => {

  const marketItemSource = markets.map(x=> {
    return  {
      id: x.id,
      marketCurrencyName: x.marketCurrencyName,
      marketPair: x.name,
      countries: x.countries.map(x=>x.name).join(', '),
      feeModeName: x.feeModeName,
      feeDefinitionName: x.feeDefinitionName,
      action: ([<Button key={1} disabled bsStyle="link">Deactive</Button>, <Button key={2} onClick={() => actions.displayFeeConfiguration(x.id, x.feeId, x.feeModeId)} bsStyle="link">Fee Configurate</Button>]) }
  });

  const currenciesItemSource = currencies.map(x => {
    return { 
      currency: x.name,
      currencyType: x.typeName,
      markets: x.markets.map(x=>x.name).join(', '),
      action: ([<Button key={3} disabled bsStyle="link">Deactive</Button>, <Button key={4} bsStyle="link" onClick={() => actions.showCurrencyEditor(x)}>Configurate</Button>]) }
  });

  const countryItemSource = countries.map(x=> {
    return  { 
      id: x.id,
      country: x.name,
      markets: x.markets.map(x=>x.name).join(', '),
    action: ([<Button key={5} disabled bsStyle="link">Deactive</Button>, <Button key={6} bsStyle="link">Tax Configurate</Button>]) }
  });

  return (
<div>
  <Tabs defaultActiveKey="market" animation={false} id="marketTab">
    <Tab
      eventKey="market"
      key="market"
      title={
        <span className="flexible-wrapper-inline">
          <SvgSymbol href="./svg-symbols.svg#calendar" />
          <FlexibleSpacer />
          Market
        </span>
      }
    >
      <PagedGrid
        columns={[
          { key: "id", label: "ID" },
          { key: 'marketCurrencyName', label: "Market"},
          { key: "marketPair", label: "Market Pair" },
          { key: "countries", label: "Avaiable Countries" },
          { key: "feeDefinitionName", label: "Fee Name"},
          { key: "feeModeName", label: "Fee Mode"},          
          { key: "action", label: "", stretch: true }
        ]}
        items={marketItemSource}
        verticalCellBorder
        perPage={20}
      />
      <MarketFeeEditor actions={actions} marketFeeConfiguration={marketFeeConfiguration} feeDefinitions={feeDefinitions} feeModeDefinitions={feeModeDefinitions}/>
    </Tab>
    <Tab
      eventKey="feeDefinition"
      key="fee"
      title={
        <span className="flexible-wrapper-inline">
          <SvgSymbol href="./svg-symbols.svg#calculator" />
          <FlexibleSpacer />
          Fee Definition
        </span>
      }
    >
      <br />
      <FeeDefinitionContainer />
    </Tab>
    <Tab
      eventKey="other"
      key="other"
      title={
        <span className="flexible-wrapper-inline">
          <SvgSymbol href="./svg-symbols.svg#performance" />
          <FlexibleSpacer />
          Other
        </span>
      }
    >
      <br />
      <ControlLabel>Country lists</ControlLabel>
      <PagedGrid
        columns={[
          { key: "country", label: "Country Name" },
          { key: "markets", label: "Available Markets", stretch: true },
          { key: "action", label: "", stretch: true }
        ]}
        items={countryItemSource}
        verticalCellBorder
        perPage={20}
      />
      <br />
      <br />
      <ControlLabel>Currency lists</ControlLabel>
      <PagedGrid
        columns={[
          { key: "currency", label: "Currency" },
          { key: "currencyType", label: "Type" },
          { key: "markets", label: "Avaiable Markets", stretch: true },
          { key: "action", label: "", stretch: true }
        ]}
        items={currenciesItemSource}
        verticalCellBorder
        perPage={20}
      />
      <CurrencyEditor form={currencyConfiguration} actions={actions}/>
    </Tab>
  </Tabs>
</div>
  );
};

function mapStateToProps(state) {
  return {
    ...state.app.masterData,
    ...state.data.marketData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ...bindActionCreators(MarketActions, dispatch),
      updateFeeConfiguration: () => dispatch(MarketMiddlewares.updateFeeConfiguration())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  MarketViewContainer
);
