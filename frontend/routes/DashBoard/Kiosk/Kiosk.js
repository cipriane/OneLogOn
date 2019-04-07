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
const REASONS_PAGE = 1;
const WAIVER_PAGE = 2;
const FINISH_PAGE = 3;

const PAGES = [
  { id: CHECK_IN_PAGE, name: 'Check In', component: CheckInPage },
  { id: REASONS_PAGE, name: 'Reasons', component: ReasonsPage },
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
    checkInID: null,
    checkInTime: '',
    checkOutTime: '',
    waiverSigned: false,
    isEmployee: false,
    visitorId: '', // The actual ID of the visitor in the database
    studentId: '', // The number the visitor enters
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
      } else if (this.state.page === REASONS_PAGE) {
        this.reasonsNext(param);
        return;
      } else if (this.state.page === WAIVER_PAGE) {
        this.waiverNext(param);
        return;
      } else {
        this.determineNextPage();
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
        myFetch('/api/visitreasons?is_archived=false'),
        this.findOrCreateVisitor(param),
      ]);
      this.setState(
        {
          reasons: reasons,
          visitorId: visitor.id,
          studentId: visitor.visitor_id,
          waiverSigned: visitor.waiver_signed,
          isCheckedIn: visitor.is_checked_in || false,
          checkInID: visitor.check_in_id,
          isLoading: false,
        },
        this.determineNextPage,
      );
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
    this.setState(
      prevState => ({
        selectedReasons: param,
      }),
      this.determineNextPage,
    );
  };

  waiverNext = async param => {
    if (!param) {
      this.determineNextPage();
      return;
    }

    try {
      this.setState({
        error: null,
        isLoading: true,
      });
      let visitor = await myFetch(`/api/visitors/${this.state.studentId}/update`, {
        method: 'PATCH',
        body: {
          is_employee: this.state.isEmployee,
          waiver_signed: !!param,
        },
      });

      this.setState(
        {
          waiverSigned: visitor.waiver_signed,
          isLoading: false,
        },
        this.determineNextPage,
      );
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  };

  determineNextPage = () => {
    const { page, visitorId, reasons, isCheckedIn, selected, waiverSigned, error } = this.state;
    const hasReasons = Array.isArray(reasons) && reasons.length;
    let nextPage = page;
    switch (page) {
      case CHECK_IN_PAGE:
        if (visitorId && isCheckedIn) {
          nextPage = FINISH_PAGE;
          break;
        } else if (visitorId && !isCheckedIn && hasReasons) {
          nextPage = REASONS_PAGE;
          break;
        } else if (visitorId && !isCheckedIn && !hasReasons && !waiverSigned) {
          nextPage = WAIVER_PAGE;
          break;
        } else if (visitorId && !isCheckedIn && !hasReasons && waiverSigned) {
          nextPage = FINISH_PAGE;
          break;
        }
      case REASONS_PAGE:
        if (!waiverSigned) {
          nextPage = WAIVER_PAGE;
          break;
        } else if (waiverSigned) {
          nextPage = FINISH_PAGE;
          break;
        }
      case WAIVER_PAGE:
        nextPage = FINISH_PAGE;
        break;
      case FINISH_PAGE:
        nextPage = CHECK_IN_PAGE;
        break;
      default:
        nextPage = (page + 1) % PAGES.length;
        break;
    }
    if (nextPage === CHECK_IN_PAGE) {
      this.cancel(); // reset all inputs
    } else {
      this.setState({
        page: nextPage,
      });
    }
  };

  checkIn = async () => {
    try {
      this.setState({ error: null, isLoading: true });
      const checkInResp = await myFetch('/api/checkins/create', {
        method: 'POST',
        body: {
          visitor: this.state.visitorId,
          check_in: new Date(),
        },
      });

      const { selectedReasons } = this.state;
      if (selectedReasons && selectedReasons.length) {
        let checkInVisitReasons = selectedReasons.map(reasonId => {
          return {
            check_in: checkInResp.id,
            visit_reason: reasonId,
          };
        });
        const checkInVisitReasonsResp = await myFetch('/api/checkinvisitreason/create', {
          method: 'POST',
          body: checkInVisitReasons,
        });
      }

      this.setState({
        isCheckedIn: true,
        isLoading: false,
      });
    } catch (err) {
      this.setState({ isLoading: false, error: err.message });
    }
  };

  checkOut = async () => {
    try {
      this.setState({ error: null, isLoading: true });

      const checkOutResp = await myFetch(`/api/checkins/${this.state.checkInID}/update`, {
        method: 'PATCH',
        body: {
          check_out: new Date(),
        },
      });

      this.setState({
        checkInTime: checkOutResp.check_in,
        checkOutTime: checkOutResp.check_out,
        isCheckedIn: false,
        isLoading: false,
      });
    } catch (err) {
      this.setState({ isLoading: false, error: err.message });
    }
  };

  cancel = event => {
    event && event.preventDefault();
    this.setState({
      password: '',
      invalidPassword: false,
      page: CHECK_IN_PAGE,
      reasons: [],
      selectedReasons: [],
      isCheckedIn: false,
      checkInID: null,
      checkInTime: '',
      checkOutTime: '',
      waiverSigned: false,
      isEmployee: false,
      visitorId: '',
      studentId: '',
      isLoading: false,
      error: null,
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
    const { page, error, isLoading, isFullscreen, invalidPassword, isCheckedIn } = this.state;
    const user = me(this.props.jwt);

    if (!user.is_kiosk_mode) {
      return (
        <FullScreenLayout>
          <Form noValidate className={s.margin} onSubmit={this.activateKioskMode}>
            <MainFormLayout>
              <FancyFormHeader />
              <div className={s.text}>
                <Alert variant="danger">Activating Kiosk mode will log you out.</Alert>
              </div>
              {invalidPassword && <Alert variant="danger">Invalid password</Alert>}
              <Form.Group controlId="username" className={s.hidden}>
                <Form.Control
                  type="text"
                  name="username"
                  autoComplete="usernname"
                  hidden
                  readOnly
                  value={me(this.props.jwt).username}
                />
              </Form.Group>
              <Form.Group>
                <FancyTextField
                  required
                  autoComplete="current-password"
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
                type="submit"
                loading={isLoading ? 1 : 0}
                disabled={!this.state.password}
              />
            </MainFormLayout>
          </Form>
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
    const mainReasons = reasons.filter(reason => reason.is_main_reason);
    const subReasons = reasons.filter(reason => !reason.is_main_reason);
    const fullscreenButton = isFullscreen ? null : (
      <div className={s.icon} onClick={this.goFullscreen}>
        <img src={fullscreenIcon} alt="Fullscreen" />
      </div>
    );
    const { checkInTime, checkOutTime } = this.state;
    return (
      <Fullscreen enabled={isFullscreen} onChange={isFullscreen => this.setState({ isFullscreen })}>
        <FullScreenLayout>
          <MainFormLayout>
            <PageToDisplay
              cancel={this.cancel}
              next={this.next}
              mainReasons={mainReasons}
              subReasons={subReasons}
              checkIn={this.checkIn}
              checkOut={this.checkOut}
              checkInTime={checkInTime}
              checkOutTime={checkOutTime}
              isCheckedIn={isCheckedIn}
              isLoading={isLoading ? 1 : 0}
              error={error}
            />
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
