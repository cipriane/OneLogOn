import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FancyButton from 'common/FancyButton/FancyButton';
import FancyFormHeader from 'common/FancyFormHeader/FancyFormHeader';
import s from './FinishPage.css';

export default class FinishPage extends Component {
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
        <h1 className={s.title}>Thank you for checking in!</h1>
        <div className={s.text}>Please remember to sign out.</div>
        <FancyButton label="Finish" onClick={this.props.next(null)} />
      </React.Fragment>
    );
  }
}
