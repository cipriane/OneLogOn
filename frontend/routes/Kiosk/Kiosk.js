import React, { Component } from 'react';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import Fullscreen from 'react-full-screen';
import FancyButton from 'common/FancyButton/FancyButton';
import CheckInPage from './CheckInPage/CheckInPage';
import ErrorPage from './ErrorPage/ErrorPage';
import FinishPage from './FinishPage/FinishPage';
import ReasonsPage from './ReasonsPage/ReasonsPage';
import WaiverPage from './WaiverPage/WaiverPage';

const PAGES = [
  { id: 0, name: 'Check In', component: CheckInPage },
  { id: 1, name: 'Reasons', component: ReasonsPage },
  { id: 2, name: 'Waiver', component: WaiverPage },
  { id: 3, name: 'Finish', component: FinishPage },
];

export default class Kiosk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isKioskModeActivated: false,
      page: 0,
      error: null,
    };
  }

  next = () => {
    this.setState((prevState, props) => ({
      page: (prevState.page + 1) % PAGES.length,
    }));
  };

  activateKioskMode = () => {
    // TODO: change user's role so user is not logged in anymore
    this.setState({
      isKioskModeActivated: true,
    });
  };

  render() {
    const { page, isKioskModeActivated, error } = this.state;
    if (!isKioskModeActivated) {
      return (
        <Fullscreen enabled={isKioskModeActivated}>
          <FullScreenLayout>
            <h1>Kiosk Page</h1>
            <div>Activating Kiosk mode will activate fullscreen mode and log you out.</div>
            <div>To escape Kiosk mode, press shift + ESC.</div>
            <FancyButton label="Activate Kiosk Mode" onClick={this.activateKioskMode} />
          </FullScreenLayout>
        </Fullscreen>
      );
    }
    let PageToDisplay;
    if (error) {
      PageToDisplay = ErrorPage;
    } else {
      PageToDisplay = PAGES[page].component;
    }
    return (
      <Fullscreen enabled={isKioskModeActivated}>
        <PageToDisplay next={this.next} />
      </Fullscreen>
    );
  }
}
