import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from 'common/Header/Header';
import Footer from 'common/Footer/Footer';
import s from './Layout.css';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        {this.props.children}
        <Footer />
      </React.Fragment>
    );
  }
}
