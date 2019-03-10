import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from 'actions';
import PropTypes from 'prop-types';
import Fullscreen from 'react-full-screen';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import FancyTextField from 'common/FancyTextField/FancyTextField';
import FancyButton from 'common/FancyButton/FancyButton';
import FancyFormHeader from 'common/FancyFormHeader/FancyFormHeader';
import fullscreenIcon from 'assets/fullscreen.svg';
import { Alert, Form } from 'react-bootstrap';
import myFetch from 'utils/fetch';
import me from 'utils/me';
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

class Kiosk extends Component {
  static propTypes = {
    jwt: PropTypes.string.isRequired,
  };

  state = {
    password: '',
    invalidPassword: false,
    isFullscreen: false,
    page: CHECK_IN_PAGE,
    reasons: [],
    selectedReasons: [],
    isCheckedIn: false,
    waiverSigned: false,
    isEmployee: false,
    visitorId: '',
    isLoading: false,
    error: null,
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  next = param => event => {
    event && event.preventDefault();
    try {
      if (this.state.error) {
        this.setState({
          page: CHECK_IN_PAGE,
          error: null,
        });
        return;
      } else if (this.state.page === CHECK_IN_PAGE) {
        this.checkInNext(param);
        return;
      } else if (this.state.page === REAONS_PAGE) {
        this.reasonsNext(param);
        return;
      } else if (this.state.page === WAIVER_PAGE) {
        this.waiverNext(param);
        return;
      } else {
        this.setState(prevState => ({
          page: (prevState.page + 1) % PAGES.length, // TODO: replace?
        }));
      }
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  };

  checkInNext = async param => {
    if (!param) {
      this.setState({
        error: 'No id given',
      });
      return;
    }

    try {
      this.setState({
        error: null,
        isLoading: true,
      });
      let [reasons, visitor] = await Promise.all([
        myFetch('/api/visitreasons'),
        this.findOrCreateVisitor(param),
      ]);

      this.setState({
        reasons: reasons,
        visitorId: visitor.id,
        waiverSigned: visitor.waiver_signed,
        isLoading: false,
        page: (this.state.page + 1) % PAGES.length,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  };

  findOrCreateVisitor = async studentId => {
    try {
      let visitor = await myFetch(`/api/visitors/${studentId}`);
      return visitor;
    } catch (err) {
      if (err.message.indexOf('Not found.') !== -1) {
        return await myFetch(`/api/visitors/create`, {
          method: 'POST',
          body: {
            visitor_id: studentId,
          },
        });
      } else {
        throw new Error(err.message);
      }
    }
  };

  reasonsNext = async param => {
    this.setState(prevState => ({
      page: (prevState.page + 1) % PAGES.length,
      selectedReasons: param,
    }));
  };

  waiverNext = async param => {
    if (!param) {
      this.setState(prevState => ({
        page: (prevState.page + 1) % PAGES.length,
      }));
      return;
    }

    try {
      this.setState({
        error: null,
        isLoading: true,
      });
      let visitor = (myFetch(`/api/visitors/${this.state.visitorId}/update`),
      {
        method: 'PUT',
        body: {
          waiver_signed: !!param,
        },
      });

      this.setState({
        waiverSigned: visitor.waiver_signed,
        isLoading: false,
        page: (this.state.page + 1) % PAGES.length,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  };

  cancel = event => {
    event && event.preventDefault();
    this.setState({
      page: CHECK_IN_PAGE,
      error: null,
      reasons: [],
      hasSigned: false,
      is_employee: false,
    });
  };

  activateKioskMode = async event => {
    event && event.preventDefault();
    try {
      this.setState({ invalidPassword: false, isLoading: true, error: null, isFullscreen: false });

      const data = await myFetch('/api/kioskmode', {
        method: 'POST',
        body: {
          username: me(this.props.jwt).username,
          password: this.state.password,
        },
      });

      this.setState({ password: '', isLoading: false, isFullscreen: true }, () => {
        this.props.login(data);
      });
    } catch (err) {
      return this.setState({
        invalidPassword: true,
        password: '',
        isLoading: false,
        isFullscreen: false,
      });
    }
  };

  goFullscreen = event => {
    event && event.preventDefault();
    this.setState({ isFullscreen: true });
  };

  render() {
    const { page, error, isLoading, isFullscreen, invalidPassword } = this.state;
    const user = me(this.props.jwt);

    if (!user.is_kiosk_mode) {
      return (
        <FullScreenLayout>
          <MainFormLayout>
            <FancyFormHeader />
            <div className={s.text}>
              <Alert variant="danger">
                Activating Kiosk mode will log you out.
                {'\n'}
                To escape Kiosk mode, press ESC.
              </Alert>
            </div>
            {invalidPassword && <Alert variant="danger">Invalid password</Alert>}
            <Form.Group>
              <FancyTextField
                required
                type="password"
                placeholder="password"
                name="password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Text className="text-muted">
              You must enter your password to activate kiosk mode
            </Form.Text>
            <FancyButton
              label="Activate Kiosk Mode"
              onClick={this.activateKioskMode}
              loading={isLoading ? 1 : 0}
              disabled={!this.state.password}
            />
          </MainFormLayout>
        </FullScreenLayout>
      );
    }
    let PageToDisplay;
    if (error) {
      PageToDisplay = ErrorPage;
    } else {
      PageToDisplay = PAGES[page].component;
    }

    const { reasons } = this.state;
    const fullscreenButton = isFullscreen ? null : (
      <div className={s.icon} onClick={this.goFullscreen}>
        <img src={fullscreenIcon} alt="Fullscreen" />
      </div>
    );
    return (
      <Fullscreen enabled={isFullscreen} onChange={isFullscreen => this.setState({ isFullscreen })}>
        <FullScreenLayout>
          <MainFormLayout>
            <PageToDisplay cancel={this.cancel} next={this.next} reasons={reasons} error={error} />
          </MainFormLayout>
          {fullscreenButton}
        </FullScreenLayout>
      </Fullscreen>
    );
  }
}

const mapStateToProps = store => {
  return {
    jwt: store.jwt,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Kiosk);

// Named unconnected export for testing
export { Kiosk as KioskTest };
