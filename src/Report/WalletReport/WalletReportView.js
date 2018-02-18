import React from "react";

import { ControlLabel, Row, Col } from 'react-bootstrap';
import { PagedGrid, Button } from "adslot-ui";
import _ from 'lodash';

const WalletReportView = ({ actions, markets, countries, marketCountries, currencies, userWallets }) => {

  const getRowLine = (currencyName, balance, available, key) => (
    <Row>
      <Col xs={1}>
        <ControlLabel>{currencyName}</ControlLabel>
      </Col>
      <Col xs={9}>
        <p>{available} / {balance}</p>
      </Col>
    </Row>);

  var userWalletGroupped = _.groupBy(userWallets, 'userId'); 

  const userWalletItemSource = Object.keys(userWalletGroupped).map(x=> { 
    let listItems = userWalletGroupped[x];
    listItems = listItems.sort();
    return {
    userName: listItems[0].userName,
    wallets: listItems.map((x, key) => getRowLine(x.walletName, x.balance, x.available, key))
  }});

  return (
    <div>
    <Button bsStyle="link" onClick={actions.getWallets}>Reload 'User Wallets'</Button>
    <PagedGrid
            columns={[
              { key: 'userName', label: 'User' },
              { key: 'wallets', label: 'Wallet Available/Balance', stretch: true },
            ]}
            items={userWalletItemSource}
            verticalCellBorder
            perPage={100}
          />
      </div>
  );
};

export default WalletReportView;