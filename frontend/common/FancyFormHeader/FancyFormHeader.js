import React, { Component } from 'react';
import s from './FancyFormHeader.css';
import Form from 'react-bootstrap/Form';
import logo from 'assets/logo-full-color.png';
import FormIcon from 'common/FormIcon/FormIcon';

export default class FancyFormHeader extends React.Component {
  render() {
    const labelText = this.props.text ? (
      <Form.Label className={s.headerText}>{this.props.text}</Form.Label>
    ) : null;
    return (
      <div className={s.logoContainer}>
        <FormIcon url={logo} />
        {labelText}
      </div>
    );
  }
}
