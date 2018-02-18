import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/lib/Alert';

function AlertAutoCloseable({
  type, visible, onDismiss, children,
}) {
  let alertComponent = null;
  if (visible) {
    alertComponent = (
      <Alert className="alertautocloseable-component" bsStyle={type} onDismiss={onDismiss}>
        {children}
      </Alert>);
  }
  return alertComponent;
}

AlertAutoCloseable.propTypes = {
  type: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func,
  children: PropTypes.node,
};

AlertAutoCloseable.defaultProps = {
  type: 'info',
};

export default AlertAutoCloseable;
