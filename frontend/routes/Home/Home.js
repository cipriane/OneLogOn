import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';
import FormIcon from 'common/FormIcon/FormIcon';
import Layout from 'common/Layout/Layout';
import s from './Home.css';

export default class Home extends Component {
  handleClick = () => {
    console.log('Button Clicked');
  }

  render() {
    return (
      <Layout>
          <Form className={s.root}>
            <MainFormLayout>
              <Form.Group controlId="formBasicEmail" >
                <FormIcon url="https://proxy.duckduckgo.com/ip3/www.makerhq.org.ico" />
                <Form.Label className={s.headerText}>Welcome to OneLogOn</Form.Label> <br/>
                <Form.Control className={s.textfield} type="text" placeholder="Enter ID" />
              </Form.Group>
              <FancyButton label="Log in" onClick={this.handleClick}/>
            </MainFormLayout>
        </Form>
      </Layout>
    );
  }
}
