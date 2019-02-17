import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';
import FormIcon from 'common/FormIcon/FormIcon';
import Layout from 'common/Layout/Layout';
import s from './Home.css';

export default class Home extends Component {
  state = {
    id: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('form submitted');
    console.log(this.state.id);
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
                <FormIcon url="https://proxy.duckduckgo.com/ip3/www.makerhq.org.ico" />
                <Form.Label className={s.headerText}>Welcome to OneLogOn</Form.Label> <br />
                <Form.Control
                  autoFocus
                  className={s.textfield}
                  type="text"
                  placeholder="Enter ID"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <FancyButton label="Log in" type="submit" />
            </MainFormLayout>
          </Form>
        </FullScreenLayout>
      </Layout>
    );
  }
}
