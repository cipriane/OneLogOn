import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';
import FancyTextField from 'common/FancyTextField/FancyTextField';
import FancyFormHeader from 'common/FancyFormHeader/FancyFormHeader';
import Layout from 'common/Layout/Layout';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import s from './Home.css';
//import Jumbotron from 'react-bootstrap/Jumbotron'
//import Container from 'react-bootstrap/Container'

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
            <h1 className={s.centered}>Functionality</h1>
            <p>
              /* TO DO */
              <br />
              Add some diagrams / screenshots of the awesome app
              <br />
              Carousel?
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
