import React, { Component } from 'react';
import FancyButton from 'common/FancyButton/FancyButton';
import CustomCarousel from 'common/CustomCarousel/CustomCarousel';
import { Container, Row, Col } from 'react-bootstrap';
import s from './Home.css';

import image1 from 'assets/screenshots/dashboard-reasons.png';
import image2 from 'assets/screenshots/login-page.png';

const images = [
  { id: 0, title: 'dashboard-reasons', src: image1 },
  { id: 1, title: 'login-page', src: image2 },
];

export default class Home extends Component {
  handleLogInButton = event => {
    this.props.history.push('/login');
  };

  handleRegisterButton = event => {
    this.props.history.push('/register');
  };

  render() {
    const buttonTextLogin = 'Log In';
    const buttonTextRegister = 'Register';

    return (
      <Container className={s.background}>
        <Row>
          <Col>
            <h1 className={`${s.title} ${s.centered}`}>OneLogOn</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <h3 className={`${s.tagline} ${s.centered}`}>
              A simple Open Source visitor check-in and statistics aggregation system for your
              facility or site.
            </h3>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={s.fiftyfifty}>
              <FancyButton
                label={buttonTextRegister}
                onClick={this.handleRegisterButton}
                type="submit"
              />
            </div>
            <div className={s.fiftyfifty}>
              <FancyButton
                label={buttonTextLogin}
                onClick={this.handleLogInButton}
                type="submit"
                className={s.secondaryButton}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className={s.functionality}>
            <CustomCarousel images={images} />
          </Col>
        </Row>
      </Container>
    );
  }
}
