import  { Modal } from 'react-bootstrap';
import React from 'react';

import { Button } from 'adslot-ui';

function ModalFrame(props) {
  return (
    <Modal 
      bsSize={props.bsSize}
      className={`modal-component ${props.className}`}
      keyboard={props.keyboard}
      show={props.show}
      animation={props.animation}
    >
      {props.modalTitle ?
        <Modal.Header>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        : null}
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
      {props.showNegativeButton && <Button onClick={props.negativeButtonClicked}>{props.negativeButtonLabel}</Button>}
      {props.showPrimaryButton && <Button onClick={props.primaryButtonClicked} bsStyle="primary">{props.primaryButtonLabel}</Button> }
      </Modal.Footer>
    </Modal>
  );
}

ModalFrame.defaultProps = {
  bsSize: 'lg',
  animation: true,
  buttonSize: '',
  className: '',
  keyboard: false,
  modalTitle: '',
  alert: { visible: false },
  showNegativeButton: true,
  showPrimaryButton: true,
  primaryButtonLabel: 'Add',
  negativeButtonLabel: 'Cancel'
};

export default ModalFrame;
