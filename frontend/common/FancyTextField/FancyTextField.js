import React, { Component } from 'react';
import s from './FancyTextField.css';
import Form from 'react-bootstrap/Form';
//import Control from 'react-bootstrap/Form/From';

export default class FancyTextField extends React.Component {
  render() {
    const _required = this.props.required == null ? false : true;
    const _autofocus = this.props.autoFocus == null ? false : true;

    return (
      <Form.Control
        required={_required}
        autoFocus={_autofocus}
        className={s.textfield}
        type={this.props.type}
        placeholder={this.props.placeholder}
        name={this.props.name}
        onChange={this.props.onChange}
      />
    );
  }
}
