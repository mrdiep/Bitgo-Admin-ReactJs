import React from "react";

import { ControlLabel, Row, Col } from 'react-bootstrap';
import { PagedGrid, Button } from "adslot-ui";

const TransactionReportView = ({ actions, markets, countries, marketCountries, currencies, executedOrders }) => {
  const getRowLine = (title, value) => (
  <Row>
    <Col xs={3}>
      <ControlLabel>{title}</ControlLabel>
    </Col>
    <Col xs={9}>
      <p>{value}</p>
    </Col>
  </Row>
  )
  const executedOrderItemSource = executedOrders.map(x=> {
    return  {
      cost: (
        <div>
          {getRowLine('Executed Amount', x.amount)}
          {getRowLine('Executed Price', x.price)}
        </div>
      ),
      genericColumn: (
        <div>
          {getRowLine('Market', x.market)}
          {getRowLine('History Id', x.id)}
          {getRowLine('Transaction Id', x.TransactionId)}
        </div>
      ),
      buyerInfo: (
      <div>
        {getRowLine(x.buyerType, x.buyerInfo)}
        {getRowLine('Order State', x.buyFullFillStateName)}
        {getRowLine('Order Type', x.buyOrderTypeName)}
        {getRowLine('Buy Fee', x.buyerFee)}
        {getRowLine('OrderId', x.BuyOrderId)}
      </div>
        ),
      sellerInfo: (
          <div>
            {getRowLine(x.sellerType, x.sellerInfo)}
            {getRowLine('Order State', x.sellFullFillStateName)}
            {getRowLine('Order Type', x.sellOrderTypeName)}
            {getRowLine('Sell Fee', x.sellerFee)}
            {getRowLine('OrderId', x.SellOrderId)}
          </div>
            ),
      actions: ([<Button key={1} bsStyle="primary">View Buyer Transaction</Button>, <Button key={2} bsStyle="primary">FeeView Seller Transaction</Button>]) }
  });

  return (
    <div>
    <Button bsStyle="link" onClick={actions.getExecutedOrders}>Reload 'Execution Histories'</Button>
    <PagedGrid
            columns={[
              { key: 'genericColumn', label: 'Generic Info' },
              { key: 'buyerInfo', label: 'Buy' },
              { key: 'sellerInfo', label: 'Sell' },
              { key: 'cost', label: 'Cost' },
              //{ key: 'actions', label: ''},
            ]}
            items={executedOrderItemSource}
            verticalCellBorder
            perPage={20}
          />
      </div>
  );
};

export default TransactionReportView;