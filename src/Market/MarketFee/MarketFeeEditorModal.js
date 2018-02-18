import React from "react";
import ModalFrame from '../../CommonComponents/ModalFrame'

import {ControlLabel} from 'react-bootstrap';
import { Select } from 'adslot-ui';

const MarketFeeEditor = ({ marketFeeConfiguration, feeModeDefinitions, feeDefinitions, actions }) => { 
return( 
<ModalFrame show={marketFeeConfiguration.isShow} modalTitle="Update Fee Mode" 
        primaryButtonLabel="Apply"
        bsSize="sm"
        primaryButtonClicked={actions.updateFeeConfiguration}
        negativeButtonClicked={actions.hideFeeConfiguration}
        >
      <ControlLabel>Fee Name</ControlLabel>
      <Select
        clearable={false}
        noResultsText="Sorry, couldn't find that fee name."
        options={feeDefinitions.map(x=> { return { label:x.name, value: x.id }})}
        placeholder="Select fee name"
        value={marketFeeConfiguration.feeIdSelected}
        onChange={(evt) => actions.setFeeId(evt.value)}
      />
      <br/>
      <ControlLabel>Fee Mode</ControlLabel>
      <Select
        clearable={false}
        noResultsText="Sorry, couldn't find any feeMode."
        options={feeModeDefinitions.map(x=> {return {label: x.name, value: x.id}})}
        placeholder="Select fee mode"
        value={marketFeeConfiguration.feeModeIdSelected}
        onChange={(evt) => actions.setFeeModeId(evt.value)}
      />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </ModalFrame>
)
  };

  export default MarketFeeEditor;