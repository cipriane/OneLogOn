import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Layout from 'common/Layout/Layout';
import s from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <Layout>
          <Form className={s.root}>
            <div className={s.formContent}>
              <Form.Group controlId="formBasicEmail" >
              <div>
                <img src="https://proxy.duckduckgo.com/ip3/www.makerhq.org.ico" className={s.icon} alt="User Icon" />
              </div>
              <Form.Label className={s.headerText}>Welcome to OneLogOn</Form.Label> <br/>
              <Form.Control type="text" placeholder="Enter ID" />
              </Form.Group>
              <input type="submit" value="Log In"></input>
            </div>
        </Form>
      </Layout>
    );
  }
}
