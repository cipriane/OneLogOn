import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FancyButton from 'common/FancyButton/FancyButton';
import CustomCarousel from 'common/CustomCarousel/CustomCarousel';
import { Container, Row, Col } from 'react-bootstrap';
import me from 'utils/me';
import s from './Home.css';

import image1 from 'assets/screenshots/dashboard-reasons.png';
import image2 from 'assets/screenshots/login-page.png';

const images = [
  { id: 0, title: 'dashboard-reasons', src: image1 },
  { id: 1, title: 'login-page', src: image2 },
];

class Home extends Component {
  static propTypes = {
    jwt: PropTypes.string,
  };

  handleLogInButton = event => {
    this.props.history.push('/login');
  };

  handleRegisterButton = event => {
    this.props.history.push('/register');
  };

  handleDashboardButton = event => {
    this.props.history.push('/dashboard');
  };

  render() {
    const buttonTextLogin = 'Log In';
    const buttonTextRegister = 'Register';
    const buttonTextDashboard = 'Go to dashboard';

    let buttons = null;
    const myself = me(this.props.jwt);
    if (myself && myself.id && !myself.is_kiosk_mode) {
      buttons = <FancyButton label={buttonTextDashboard} onClick={this.handleDashboardButton} />;
    } else {
      buttons = (
        <React.Fragment>
          <div className={s.fiftyfifty}>
            <FancyButton label={buttonTextRegister} onClick={this.handleRegisterButton} />
          </div>
          <div className={s.fiftyfifty}>
            <FancyButton
              label={buttonTextLogin}
              onClick={this.handleLogInButton}
              className={s.secondaryButton}
            />
          </div>
        </React.Fragment>
      );
    }

    return (
      <Container className={s.background}>
        <Row className={s.fixMargin}>
          <Col>
            <h1 className={`${s.title} ${s.centered}`}>OneLogOn</h1>
          </Col>
        </Row>

        <Row className={s.fixMargin}>
          <Col>
            <h2 className={`${s.tagline} ${s.centered}`}>
              The premier standard for welcoming visitors and employees
            </h2>
          </Col>
        </Row>

        <Row className={[s.fixMargin, s.buttonContainer].join(' ')}>
          <Col>{buttons}</Col>
        </Row>

        <Row className={s.fixMargin}>
          <Col className={s.functionality}>
            <CustomCarousel images={images} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = store => {
  return {
    jwt: store.jwt,
  };
};

export default connect(mapStateToProps)(Home);

// Named unconnected export for testing
export { Home as HomeTest };
