import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';
import FormIcon from 'common/FormIcon/FormIcon';
import Layout from 'common/Layout/Layout';
import s from './Home.css';
import logo from 'assets/logo-full.png';

export default class Home extends Component {
  constructor(...args) {
    super(...args);

    this.state = { validated: false, id: '' };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ validated: true });
  };

  handleChange = evt => {
    this.setState({
      id: evt.target.value,
    });
  };

  render() {
    const { validated } = this.state;
    return (
      <Layout>
        <FullScreenLayout>
          <Form noValidate validated={validated} onSubmit={e => this.handleSubmit(e)}>
            <MainFormLayout>
              <Form.Group>
                <FormIcon url={logo} />
                <Form.Label className={s.headerText}>Welcome to OneLogOn</Form.Label> <br />
                <Form.Control
                  autoFocus
                  required
                  className={s.textfield}
                  type="text"
                  placeholder="Enter ID"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid ID.
                </Form.Control.Feedback>
              </Form.Group>
              <FancyButton label="Check in" type="submit" />
            </MainFormLayout>
          </Form>
        </FullScreenLayout>
      </Layout>
    );
  }
}
