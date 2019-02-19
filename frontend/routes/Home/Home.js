import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';
import FancyTextField from 'common/FancyTextField/FancyTextField';
import FancyFormHeader from 'common/FancyFormHeader/FancyFormHeader';
import Layout from 'common/Layout/Layout';
import s from './Home.css';

export default class Home extends Component {
  state = {
    id: '',
  };

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
    return (
      <Layout>
        <FullScreenLayout>
          <Form onSubmit={this.handleSubmit}>
            <MainFormLayout>
              <Form.Group>
                <FancyFormHeader text="Welcome to OneLogOn" />
                <FancyTextField
                  autoFocus
                  type="text"
                  placeholder="Enter ID"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <FancyButton label="Check in" type="submit" />
            </MainFormLayout>
          </Form>
        </FullScreenLayout>
      </Layout>
    );
  }
}
