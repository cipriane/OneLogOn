import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import FancyButton from 'common/FancyButton/FancyButton';
import FancyFormHeader from 'common/FancyFormHeader/FancyFormHeader';
import s from './WaiverPage.css';

export default class WaiverPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
  };

  state = {
    hasSigned: false,
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <FancyFormHeader />
        <div className={s.root}>
          <div className={s.text}>You must sign a liability waiver to use the facilities.</div>
          <div className={s.text}>
            Please ask a staff member for assistance in signing a waiver.
          </div>
          <Form.Check>
            <Form.Check.Input
              className={s.checkboxInput}
              name="hasSigned"
              id="hasSigned"
              type="checkbox"
              onChange={this.handleChange}
            />
            <Form.Check.Label className={s.checkboxLabel} htmlFor="hasSigned">
              I have already signed a waiver
            </Form.Check.Label>
          </Form.Check>
        </div>

        <FancyButton muted label="Cancel" type="button" onClick={this.props.cancel} />
        <FancyButton
          label="Ok"
          loading={this.props.isLoading}
          onClick={this.props.next(this.state.hasSigned)}
        />
      </React.Fragment>
    );
  }
}
