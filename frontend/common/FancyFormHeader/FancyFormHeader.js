import React, { Component } from 'react';
import s from './FancyFormHeader.css';
import Form from 'react-bootstrap/Form';
import logo from 'assets/logo-full.png';
import FormIcon from 'common/FormIcon/FormIcon';

export default class FancyFormHeader extends React.Component {
  render() {
    return (
      <div>
        <FormIcon url={logo} />
        <Form.Label className={s.headerText}>{this.props.text}</Form.Label>
        <br />
      </div>
    );
  }
}
