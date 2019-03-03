import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import FancyButton from 'common/FancyButton/FancyButton';
import s from './ReasonsPage.css';

export default class ReasonsPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
    reasons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        desc: PropTypes.string,
      }),
    ).isRequired,
  };

  state = {
    selected: [],
  };

  handleChange = event => {
    const target = event.target;
    const id = target.id;
    const isChecked = this.state.selected.includes(id);

    if (!isChecked) {
      this.setState(prevState => ({
        selected: [...prevState.selected, id],
      }));
    } else {
      this.setState(prevState => ({
        selected: prevState.selected.filter(el => el !== id),
      }));
    }
  };

  render() {
    const { selected } = this.state;
    const isSelectedVariant = 'info';
    const isNotSelectedVariant = 'outline-info';
    return (
      <React.Fragment>
        <Form onSubmit={this.props.next(selected)}>
          <h1 className={s.title}>Please select at least one reason for this visit</h1>
          <div className={s.checkboxContainer}>
            {this.props.reasons.map(reason => {
              return (
                <div className={s.checkbox} key={reason.id}>
                  <Button
                    className={s.checkboxInput}
                    id={`${reason.id}`}
                    variant={
                      selected.includes(reason.id) ? isSelectedVariant : isNotSelectedVariant
                    }
                    onClick={this.handleChange}
                  >
                    {reason.desc}
                  </Button>
                </div>
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
