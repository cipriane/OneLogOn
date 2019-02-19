import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import FancyButton from 'common/FancyButton/FancyButton';

export default class ReasonsPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
    reasons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        desc: PropTypes.string,
      }),
    ).isRequired,
  };

  state = {
    selected: [],
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (value) {
      this.setState(prevState => ({
        selected: [...prevState.selected, name],
      }));
    } else {
      this.setState(prevState => ({
        selected: prevState.filter(el => el !== name),
      }));
    }
  };

  render() {
    const { selected } = this.state;
    return (
      <FullScreenLayout>
        <Form onSubmit={this.props.next(selected)}>
          <MainFormLayout>
            <h1>Why are you here?</h1>
            <div>Please select at least one</div>
            {this.props.reasons.map(reason => {
              return (
                <Form.Check
                  type="checkbox"
                  key={reason.id}
                  name={reason.id}
                  label={reason.desc}
                  onChange={this.handleChange}
                />
              );
            })}
            <FancyButton label="Next" type="submit" />
          </MainFormLayout>
        </Form>
      </FullScreenLayout>
    );
  }
}
