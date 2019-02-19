import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './NoMatch.css';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';

export default class NoMatch extends Component {
  handleSubmit = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <FullScreenLayout>
        <MainFormLayout>
          <h1 className={s.padding}>Page Not Found</h1>
          <FancyButton label="Go Back" type="submit" onClick={this.handleSubmit} />
        </MainFormLayout>
      </FullScreenLayout>
    );
  }
}
