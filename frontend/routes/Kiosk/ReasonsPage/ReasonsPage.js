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
    const name = target.name;
    const id = target.id;
    const isChecked = this.state.selected.includes(name);
    const currentButton = document.getElementById(id);

    console.log(name);

    if (!isChecked) {
      this.setState(prevState => ({
        selected: [...prevState.selected, name],
      }));
      currentButton.classList.remove('btn-outline-info');
      currentButton.classList.add('btn-info');
    } else {
      currentButton.classList.remove('btn-info');
      currentButton.classList.add('btn-outline-info');
      this.setState(prevState => ({
        selected: prevState.selected.filter(el => el != name),
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
                <div className={s.checkbox} key={reason.id}>
                  <Button
                    className={s.checkboxInput}
                    id={`checkbox${reason.id}`}
                    variant="outline-info"
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
