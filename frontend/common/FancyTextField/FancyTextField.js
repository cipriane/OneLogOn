import React, { Component } from 'react';
import s from './FancyTextField.css';
import Form from 'react-bootstrap/Form';
//import Control from 'react-bootstrap/Form/From';

export default class FancyTextField extends React.Component {
  render() {
    let label = this.props.label ? <Form.Label>{this.props.label}</Form.Label> : null;
    return (
      <React.Fragment>
        {label}
        <Form.Control className={s.textfield} {...this.props} />
      </React.Fragment>
    );
  }
}
