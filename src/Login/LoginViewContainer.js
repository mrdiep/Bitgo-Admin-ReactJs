import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as LoginActions from "./LoginActions";
import * as LoginMiddlewares from "./LoginMiddlewares";

import {Button} from "adslot-ui";

import FormGroup from 'react-bootstrap/lib/FormGroup';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import { Form } from 'react-bootstrap';

const LoginViewContainer = ({actions, username, password}) => {

    return (
        <div>
            <Form>
                <FormGroup>
                    <Row className="username-field">
                        <Col xs={2}></Col>
                        <Col xs={3}>
                        <br/>
                            <ControlLabel bsClass="control-label section-label">
                                Username
                            </ControlLabel>
                            <FormControl
                                type="text"
                                value={username}
                                onChange={(evt) => actions.setUsername(evt.target.value)}/>
                        </Col>
                    </Row>
                    <Row className="name-field">
                        <Col xs={2}>
                            
                        </Col>
                        <Col xs={3}>
                        <br/>
                        <ControlLabel bsClass="control-label section-label">
                                Password
                            </ControlLabel>
                            <FormControl
                                type="password"
                                value={password}
                                onChange={(evt) => actions.setPassword(evt.target.value)}/>
                        </Col>
                    </Row>
                    <Row className="name-field">
                        <Col xs={2}></Col>
                        <Col xs={3}>
                         <br/>
                            <Button bsStyle="primary" disabled={!username} onClick={actions.doLogin}>Login</Button>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        ...state.login
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ...bindActionCreators(LoginActions, dispatch), 
            doLogin: () => dispatch(LoginMiddlewares.doLogin())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginViewContainer);
