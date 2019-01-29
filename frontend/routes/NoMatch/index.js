import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import s from './NoMatch.css';

export default class NoMatch extends Component {
  render() {
    return (
      <div>
        <h1>Page Not Found</h1>
        <Link to='/'>Go To Home</Link>
      </div>
    );
  }
}
