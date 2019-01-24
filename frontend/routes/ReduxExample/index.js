import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as Actions from 'actions';
import s from './ReduxExample.css';

class ReduxExample extends Component {
  render() {
    const { value, onIncreaseClick } = this.props;
    return (
      <div className={s.root}>
        <h1>Redux Example Route</h1>
        <Link to='/'>Go To Home</Link>
        <div className={s.value}>
          <span>{value}</span>
          <button onClick={onIncreaseClick}>Increase</button>
        </div>
      </div>
    );
  }
}

ReduxExample.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired,
}

// Map Redux store to component props
const mapStateToProps = store => {
  return {
    value: store.count,
  }
}

// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
  return {
    onIncreaseClick: () => dispatch(Actions.increaseCount()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxExample);
