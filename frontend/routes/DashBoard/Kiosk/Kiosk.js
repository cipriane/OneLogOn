import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import FancyButton from 'common/FancyButton/FancyButton';
import FancyFormHeader from 'common/FancyFormHeader/FancyFormHeader';
import fullscreenIcon from 'assets/fullscreen.svg';
import { Alert } from 'react-bootstrap';
import fetch from 'utils/fetch';
import s from './Kiosk.css';

import CheckInPage from './CheckInPage/CheckInPage';
import ErrorPage from './ErrorPage/ErrorPage';
import FinishPage from './FinishPage/FinishPage';
import ReasonsPage from './ReasonsPage/ReasonsPage';
import WaiverPage from './WaiverPage/WaiverPage';

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

export default class Kiosk extends Component {
  state = {
    isKioskModeActivated: false,
    isFullscreen: false,
    page: CHECK_IN_PAGE,
    loading: false,
    error: null,
    reasons: [
      { id: 1, desc: '3D Printing' },
      { id: 2, desc: 'Audio/Video' },
      { id: 3, desc: 'CNC/Milling' },
      { id: 4, desc: 'Fiber Arts' },
      { id: 5, desc: 'General' },
      { id: 6, desc: 'Internships' },
      { id: 7, desc: 'Laser' },
      { id: 8, desc: 'Meeting' },
      { id: 9, desc: 'Power/Hand Tools' },
      { id: 10, desc: 'Vinyl Cutter' },
    ],
  };

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
          page: CHECK_IN_PAGE,
          error: null,
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
    this.setState({
      page: CHECK_IN_PAGE,
      error: null,
    });
  };

  activateKioskMode = () => {
    // TODO: change user's role so user is not logged in anymore
    // Trigger an API call, and then call the redux login() function
    this.setState({
      isKioskModeActivated: true,
      isFullscreen: true,
    });
  };

  render() {
    const { page, isKioskModeActivated, error } = this.state;

    if (!isKioskModeActivated) {
      return (
        <Fullscreen
          enabled={isFullscreen}
          onChange={isFullscreen => this.setState({ isFullscreen })}
        >
          <FullScreenLayout>
            <MainFormLayout>
              <FancyFormHeader />
              <div className={s.text}>
                <Alert variant="danger">
                  Activating Kiosk mode will activate fullscreen mode and log you out.
                </Alert>
                <p>To escape Kiosk mode, press shift + ESC.</p>
              </div>
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

    const { reasons, isFullscreen } = this.state;
    const fullscreenButton = isFullscreen ? null : (
      <div className={s.icon} onClick={this.activateKioskMode}>
        <img src={fullscreenIcon} alt="Fullscreen" />
      </div>
    );

    return (
      <Fullscreen enabled={isFullscreen} onChange={isFullscreen => this.setState({ isFullscreen })}>
        <FullScreenLayout>
          <MainFormLayout>
            <PageToDisplay cancel={this.cancel} next={this.next} reasons={reasons} />
          </MainFormLayout>
          {fullscreenButton}
        </FullScreenLayout>
      </Fullscreen>
    );
  }
}
