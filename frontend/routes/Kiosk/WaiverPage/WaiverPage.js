import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FancyButton from 'common/FancyButton/FancyButton';
import FancyFormHeader from 'common/FancyFormHeader/FancyFormHeader';
import s from './WaiverPage.css';

export default class WaiverPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <FancyFormHeader />
        <div className={s.root}>
          <div className={s.text}>You must sign a waiver to use the facilities.</div>
          <div className={s.text}>
            Please ask a staff member for assistance in signing a waiver.
          </div>
        </div>
        <FancyButton muted label="Cancel" type="button" onClick={this.props.cancel} />
        <FancyButton label="Ok" onClick={this.props.next(null)} />
      </React.Fragment>
    );
  }
}
