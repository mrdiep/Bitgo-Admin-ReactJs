import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalFrame from '../CommonComponents/ModalFrame'

import { Row, Col, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

import {
    PagedGrid,
    Button,
    Checkbox,
    Select
  } from "adslot-ui";

import * as FeeDefinitionActions from './FeeDefinitionActions';
import * as FeeDefinitionMiddlewares from './FeeDefinitionMiddlewares';

const FeeDefinitionView = ({ actions, feeForm, marketApplyForm, feeDefinitions, markets, feeModeDefinitions }) => {
  var feeColumns = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'markets', label: 'Makets' },
    { key: 'PGODiscountRate', label: 'PGO Discount Rate' },
    { key: 'MarketBuyerRate', label: 'Market Buyer Rate' },
    { key: 'MarketSellerRate', label: 'Market Seller Rate' },
    { key: 'LimitBuyerRate', label: 'Limit Buyer Rate' },
    { key: 'LimitSellerRate', label: 'Limit Seller Rate' },
    
    { key: 'MarketTakerRate', label: 'Market Taker Rate' },
    { key: 'LimitTakerRate', label: 'Limit Taker Rate' },
    { key: 'LimitMakerRate', label: 'Limit Maker Rate' },
    { key: 'actions', label: '' }
  ];
  const getFormattedPercentageNumber = (x) => Number((x * 100).toFixed(8)) + '%';

  var feeItemSource = feeDefinitions.map(x=> { return {
    name: x.name,
    description: x.description,
    markets: x.markets.map(t=>t.name).join(', '),
    LimitBuyerRate: getFormattedPercentageNumber(x.LimitBuyerRate),
    LimitSellerRate:  getFormattedPercentageNumber(x.LimitSellerRate),
    MarketBuyerRate:  getFormattedPercentageNumber(x.MarketBuyerRate),
    MarketSellerRate:  getFormattedPercentageNumber(x.MarketSellerRate),
    
    MarketTakerRate:  getFormattedPercentageNumber(x.MarketTakerRate),
    LimitTakerRate:  getFormattedPercentageNumber(x.LimitTakerRate),
    LimitMakerRate:  getFormattedPercentageNumber(x.LimitMakerRate),
  
    PGODiscountRate:  getFormattedPercentageNumber(x.PGODiscountRate),
    actions: ([
      <Button key={1} onClick={() => actions.showFeeDefinitionForm(x)} bsStyle="link">Edit</Button>,
      <Button key={2} disabled={x.markets.length === 0} onClick={() => actions.showFeeMarketsForm(x.id, x.markets, markets)} bsStyle="link">Markets</Button>
    ])}});

  const getRowEditableFee = (x, key) => (
    <Row key={key}>
        <Col xs={8}>
            <p>{x.display} (%)</p>
        </Col>
        <Col xs={4}>
            <FormControl value={x.value} onChange={(evt) => actions.updateFeeFormValue(x.name, evt.target.value)}/>
            <br/>
        </Col>
        
    </Row>);

    var controlBuyerSeller = feeForm.values.filter(x=> /(Buyer|Seller)/g.test(x.name)).map((x, index) => getRowEditableFee(x, index))
    var controlTakerMaker = feeForm.values.filter(x=> /(Taker|Maker)/g.test(x.name)).map((x, index) => getRowEditableFee(x, index))

  return (
    <div>

  <ModalFrame show={feeForm.isShow} modalTitle={feeForm.isAddingForm ? "ADD NEW FEE DEFINITION" : "UPDATE FEE DEFINITION"}
      primaryButtonLabel={feeForm.isAddingForm ? "ADD NEW FEE DEFINITION" : "UPDATE FEE DEFINITION"}
      primaryButtonClicked={feeForm.isAddingForm ? actions.addFee : actions.updateFee}
      negativeButtonClicked={actions.closeFeeDefinitionForm} >
      <FormGroup>
          <Row>
            <Col xs={4}>
                <p>Fee Name</p>
            </Col>
            <Col xs={8}>
                <FormControl value={feeForm.name} onChange={(evt) => actions.updateFeeName(evt.target.value)}/>
            </Col>
        </Row>
        <br/>
        <Row>
            <Col xs={4}>
                <p>Description</p>
            </Col>
            <Col xs={8}>
                <FormControl value={feeForm.description} onChange={(evt) => actions.updateFeeDescription(evt.target.value)}/>
            </Col>
        </Row>
          <br/>
          <Row>
            <Col xs={4}>
                <p>PGO Discount (%)</p>
            </Col>
            <Col xs={4}>
                <FormControl value={feeForm.values.filter(x=>x.name === 'PGODiscountRate')[0].value} onChange={(evt) => actions.updateFeeFormValue('PGODiscountRate', evt.target.value)}/>
            </Col>
        </Row>
        <br/> <br/>
          <Row>
            <Col xs={6}>
              <ControlLabel>APPLY ON BUYER/SELLER</ControlLabel>
                {controlBuyerSeller}
            </Col>
            <Col xs={6}>
              <ControlLabel>APPLY ON TAKER/MAKER</ControlLabel>
                  {controlTakerMaker}
            </Col>
          </Row>
        </FormGroup>
  </ModalFrame>

<ModalFrame show={marketApplyForm.isShow} modalTitle="Apply Markets"
      primaryButtonLabel="Apply"
      primaryButtonClicked={actions.updateFeeMarkets}
      negativeButtonClicked={actions.hideFeeMarketsForm} >

      <PagedGrid
        columns={[
          { key: 'market', label: 'Market' },
          { key: 'feeMode', label: 'Fee Mode (Apply On)' },
        ]}
        items={ marketApplyForm.markets.map((x, index)=>{ return {
          market: (<Checkbox
                    key={index}
                    name={x.name}
                    label={x.name}
                    value={x.name}
                    onChange={() => { }}
                    checked={x.selected}/>
                  ),
          feeMode: x.selected && <Select
          clearable={false}
          noResultsText="Must enter the fee mode"
          options={feeModeDefinitions.map(x=>{return {label: x.name, value: x.id}})}
          placeholder="Type"
          value={x.feeModeId}
          onChange={(value) => actions.setMarketFeeMode(x.name, value.value)}
        />
         } } ) }
        verticalCellBorder
        perPage={20}
      />
      <br/>
      <br/>
  </ModalFrame>

  <div>
    <br/>
    <Button disabled={feeForm.isShow} bsStyle="primary pull-right" onClick={() => actions.showFeeDefinitionForm()}>New Fee Definition</Button>
    <br/>
  </div>
      <ControlLabel>Fee lists</ControlLabel>
      <PagedGrid
        columns={feeColumns}
        items={feeItemSource}
        verticalCellBorder
        perPage={50}
      />
    </div>
  );
};

function mapStateToProps(state) {
    return {
      ...state.app.masterData,
      ...state.data.feeData
    };
  }
  
  function mapDispatchToProps(dispatch) {
    var actions = bindActionCreators(FeeDefinitionActions, dispatch);
    
    return {
      actions: {
        ...actions,
        addFee: () => dispatch(FeeDefinitionMiddlewares.addFee()),
        updateFee: () => dispatch(FeeDefinitionMiddlewares.updateFee()),
        updateFeeMarkets: () => dispatch(FeeDefinitionMiddlewares.updateFeeMarkets())
      }
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(
    FeeDefinitionView
  );