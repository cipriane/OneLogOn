import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import s from './SettingsContainer.css';

export default class SettingsContainer extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <Container className={s.padding}>
        <h2>{this.props.label}</h2>
        <div className={s.border}>
          <div className={s.formGroupContainer}>{this.props.children}</div>
        </div>
      </Container>
    );
  }
}
