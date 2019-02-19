import React, { Component } from 'react';
import s from './FancyTextField.css';
import Form from 'react-bootstrap/Form';
//import Control from 'react-bootstrap/Form/From';

export default class Textfield extends React.Component {
  render() {
    return (
      <Form.Control
        className={s.textfield}
        type={this.props.type}
        placeholder={this.props.placeholder}
        name={this.props.name}
        onChange={this.props.onChange}
      />
    );
  }
}
