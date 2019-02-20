import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FancyButton from 'common/FancyButton/FancyButton';
import s from './ReasonsPage.css';

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
        selected: prevState.selected.filter(el => el !== name),
      }));
    }
  };

  render() {
    const { selected } = this.state;
    return (
      <React.Fragment>
        <Form onSubmit={this.props.next(selected)}>
          <h1 className={s.title}>Please select at least one reason for this visit</h1>
          <div className={s.checkboxContainer}>
            {this.props.reasons.map(reason => {
              return (
                <Form.Check className={s.checkbox} key={reason.id}>
                  <Form.Check.Input
                    className={s.checkboxInput}
                    name={reason.id}
                    id={`checkbox${reason.id}`}
                    type="checkbox"
                    onChange={this.handleChange}
                  />
                  <Form.Check.Label className={s.checkboxLabel} htmlFor={`checkbox${reason.id}`}>
                    {reason.desc}
                  </Form.Check.Label>
                </Form.Check>
              );
            })}
          </div>
          <div className={s.buttonsBar}>
            <div className={s.alignLeft}>
              <FancyButton muted label="Cancel" type="button" onClick={this.props.cancel} />
            </div>
            <div className={s.alignRight}>
              <FancyButton disabled={!selected.length} label="Next" type="submit" />
            </div>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}
