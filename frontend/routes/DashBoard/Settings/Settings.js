import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SimpleHeader from 'common/SimpleHeader/SimpleHeader';
import { Container } from 'react-bootstrap';
import WelcomeMessage from 'common/WelcomeMessage/WelcomeMessage';
import Profile from 'common/Profile/Profile';
import SettingsContainer from './SettingsContainer/SettingsContainer';
import ReasonListContainer from './ReasonListContainer/ReasonListContainer';
import s from './Settings.css';
import me from 'utils/me';

class Settings extends Component {
  static propTypes = {
    jwt: PropTypes.string.isRequired,
  };

  render() {
    const user = me(this.props.jwt);

    let welcomeMessage = null;
    if (!user.is_staff) {
      welcomeMessage = (
        <SettingsContainer label={'Welcome Message'}>
          <WelcomeMessage />
        </SettingsContainer>
      );
    }

    let reasonsList = null;
    if (!user.is_staff) {
      reasonsList = <ReasonListContainer />;
    }
    return (
      <React.Fragment>
        <SimpleHeader title="Settings" />
        <div className={s.root}>
          {welcomeMessage}

          <SettingsContainer label={'Update Password'}>
            <Profile />
          </SettingsContainer>

          {reasonsList}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    jwt: store.jwt,
  };
};

export default withRouter(connect(mapStateToProps)(Settings));

// Named unconnected export for testing
export { Settings as SettingsTest };
