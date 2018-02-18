import React from "react";
import ModalFrame from '../../CommonComponents/ModalFrame'

import { ControlLabel, FormGroup, Row, Col, FormControl} from 'react-bootstrap';

const CurrencyEditor = ({
    form, actions
}) => { 

  const getValueByKeyPath = keyPath => {
    var paths = keyPath.split('.');
    var value = form;
    for(var path of paths) {
      value = value[path];
    }
    return value;
  };

  const getRowEditLine = (title, keyPath) => (
    <Row>
      <Col xs={5}>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{title}</p>
      </Col>
      <Col xs={7}>
          <FormControl value={getValueByKeyPath(keyPath)} onChange={(evt) => actions.setCurrencyConfigurationValue(keyPath, evt.target.value)}/>
      </Col>
    </Row>
  );
  const getRowLine = (title, keyPath) => (
    <Row>
      <Col xs={5}>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{title}</p>
      </Col>
      <Col xs={7}>
          <p>{getValueByKeyPath(keyPath)}</p>
      </Col>
    </Row>
  );

  const cryptoConfiguration = () => {
    switch (form.currencyName.toUpperCase()) {
      case "BTC":
        return (
          <div>
            <ControlLabel>Bitcoin Blockchain Configuration</ControlLabel><br/>
            { getRowEditLine("Number of Confirmation", "cryptoConfiguration.numberOfConfirm")}<br/>
            { getRowEditLine("Network Fee", "cryptoConfiguration.btc.networkFee")}<br/>
          </div>
        )
      case "ETH":
        return (
          <div>
            <ControlLabel>Ethereum Blockchain Configuration</ControlLabel><br/>
            { getRowEditLine("Number of Confirmation", "cryptoConfiguration.numberOfConfirm")}<br/>
            { getRowEditLine("Gas", "cryptoConfiguration.eth.gas")}<br/>
            { getRowEditLine("Gas Price", "cryptoConfiguration.eth.gasPrice")}<br/>
          </div>
        )
      case "USDT":
        return (
          <div>
            <ControlLabel>USDT Blockchain Configuration</ControlLabel><br/>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No configurations</p>
          </div>
        )
      case "PGO":
        return (
          <div>
            <ControlLabel>PGO Blockchain Configuration</ControlLabel><br/>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No configurations</p>
          </div>
        )
      default:
        return (
          <div>
            <ControlLabel>Local Bank Configuration</ControlLabel><br/>
            { getRowEditLine("Bank", "fiatConfiguration.bankName")}<br/>
          </div>
        )
    }
  }

return( 
<ModalFrame
  show = {form.isShow}
  bsSize="small"
  modalTitle = "Configurate Currency"
  primaryButtonLabel = "Apply"
  primaryButtonClicked={actions.hideCurrencyEditor}
  negativeButtonClicked={actions.hideCurrencyEditor}
  >
    <FormGroup>
      <ControlLabel>Withdraw Configuration</ControlLabel><br/>
        { getRowEditLine('Withdraw Fee Amount', 'withdrawFeeAmount') } <br/>
        { getRowEditLine('Withdraw Fee Holder', 'withdrawFeeHolder') } <br/>
        { getRowEditLine('Withdraw Minimum Amount', 'withdrawMinimumAmount') }<br/>
        { getRowLine('Withdraw Maximum Amount', 'withdrawMaximumAmount') }<br/>
      <ControlLabel>Deposit Configuration</ControlLabel><br/>
        { getRowEditLine('Deposit Fee Amount', 'depositFeeAmount')}<br/>
        { getRowEditLine('Deposit Fee Holder', 'depositFeeHolder') } <br/>
        { getRowEditLine('Deposit Minimum Amount', 'depositMinimumAmount')}<br/>
      { cryptoConfiguration() }
    </FormGroup>
</ModalFrame>)
  };

  export default CurrencyEditor;