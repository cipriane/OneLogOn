import React, { Component } from 'react';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import Fullscreen from 'react-full-screen';
import FancyButton from 'common/FancyButton/FancyButton';
import CheckInPage from './CheckInPage/CheckInPage';
import ErrorPage from './ErrorPage/ErrorPage';
import FinishPage from './FinishPage/FinishPage';
import ReasonsPage from './ReasonsPage/ReasonsPage';
import WaiverPage from './WaiverPage/WaiverPage';
import fetch from 'utils/fetch';

const CHECK_IN_PAGE = 0;
const REAONS_PAGE = 1;
const WAIVER_PAGE = 2;
const FINISH_PAGE = 3;

const PAGES = [
  { id: CHECK_IN_PAGE, name: 'Check In', component: CheckInPage },
  { id: REAONS_PAGE, name: 'Reasons', component: ReasonsPage },
  { id: WAIVER_PAGE, name: 'Waiver', component: WaiverPage },
  { id: FINISH_PAGE, name: 'Finish', component: FinishPage },
];

const defaultState = {
  isKioskModeActivated: false,
  page: CHECK_IN_PAGE,
  error: null,
  reasons: [
    { id: 1, desc: 'Anything' },
    { id: 2, desc: "Doesn't matter what I type here" },
    { id: 3, desc: 'TODO: replace with API call' },
  ],
};

export default class Kiosk extends Component {
  state = defaultState;

  checkInLogic = async param => {
    /*
    const resp = await fetch('api/visitor', {
      body: JSON.stringify({
        id: param,
      }),
    });

    if (!resp.ok) {
      throw Error(resp.statusText);
    }
    const data = await resp.json();
    if (data.is_checked_in) {
      this.setState({
        page: FINISH_PAGE,
      });
      return;
    }
    */

    // TODO: delete this with above comment
    this.setState(prevState => ({
      page: (prevState.page + 1) % PAGES.length,
    }));
  };

  reasonsLogic = async param => {
    /*
    const resp = await fetch('api/checkin', {
      method: 'POST',
      body: JSON.stringify({
        reasons: param,
      }),
    });

    if (!resp.ok) {
      throw Error(resp.statusText);
    }
    const data = await resp.json();
    */
    // TODO: delete this with above comment
    this.setState(prevState => ({
      page: (prevState.page + 1) % PAGES.length,
    }));
  };

  next = param => event => {
    event && event.preventDefault();
    try {
      // ALright, so some crazy logic is going to have to go in here.
      if (this.state.error) {
        return this.setState({
          ...defaultState,
          isKioskModeActivated: true,
        });
      } else if (this.state.page === CHECK_IN_PAGE) {
        return this.checkInLogic(param);
      } else if (this.state.page === REAONS_PAGE) {
        return this.reasonsLogic(param);
      } else {
        this.setState(prevState => ({
          page: (prevState.page + 1) % PAGES.length,
        }));
      }
    } catch (err) {
      console.error(err);
      this.setState({
        error: err.toString(),
      });
    }
  };

  cancel = event => {
    event.preventDefault();
    console.log('Canceled');
    this.setState({
      ...defaultState,
      isKioskModeActivated: true,
    });
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
            <MainFormLayout>
              <h1>Kiosk Page</h1>
              <div>Activating Kiosk mode will activate fullscreen mode and log you out.</div>
              <div>To escape Kiosk mode, press shift + ESC.</div>
              <FancyButton label="Activate Kiosk Mode" onClick={this.activateKioskMode} />
            </MainFormLayout>
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

    const { reasons } = this.state;
    return (
      <Fullscreen enabled={isKioskModeActivated}>
        <PageToDisplay cancel={this.cancel} next={this.next} reasons={reasons} />
      </Fullscreen>
    );
  }
}
