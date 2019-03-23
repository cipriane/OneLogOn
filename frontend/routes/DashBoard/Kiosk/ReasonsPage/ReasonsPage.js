import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import FancyButton from 'common/FancyButton/FancyButton';
import s from './ReasonsPage.css';

export default class ReasonsPage extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
    mainReasons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        description: PropTypes.string,
      }),
    ).isRequired,
    subReasons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        description: PropTypes.string,
      }),
    ).isRequired,
  };

  state = {
    mainReasonSelected: null,
    subReasonsSelected: [],
  };

  handleChange = event => {
    event.preventDefault();
    const { mainReasonSelected, subReasonsSelected } = this.state;
    const target = event.target;
    const id = target.id;
    const isMainReason = this.props.mainReasons.some(reason => reason.id == id);
    if (isMainReason) {
      this.setState({
        mainReasonSelected: id,
      });
      return;
    }

    const isChecked = subReasonsSelected.includes(id);

    if (!isChecked) {
      this.setState(prevState => ({
        subReasonsSelected: [...prevState.subReasonsSelected, id],
      }));
    } else {
      this.setState(prevState => ({
        subReasonsSelected: prevState.subReasonsSelected.filter(el => el !== id),
      }));
    }
  };

  render() {
    const { mainReasonSelected, subReasonsSelected } = this.state;
    const isSelectedVariant = 'info';
    const isNotSelectedVariant = 'outline-info';
    let mainReasons = this.props.mainReasons.map(reason => {
      return (
        <div className={s.checkbox} key={reason.id}>
          <Button
            className={s.checkboxInput}
            id={`${reason.id}`}
            variant={mainReasonSelected == reason.id ? isSelectedVariant : isNotSelectedVariant}
            onClick={this.handleChange}
          >
            {reason.description}
          </Button>
        </div>
      );
    });

    const hasMainReason = mainReasonSelected !== null;
    const allSelected = hasMainReason
      ? [mainReasonSelected, ...subReasonsSelected]
      : subReasonsSelected;

    let subReasons = null;
    if (hasMainReason) {
      subReasons = this.props.subReasons.map(reason => {
        return (
          <div className={s.checkbox} key={reason.id}>
            <Button
              className={s.checkboxInput}
              id={`${reason.id}`}
              variant={
                subReasonsSelected.includes('' + reason.id)
                  ? isSelectedVariant
                  : isNotSelectedVariant
              }
              onClick={this.handleChange}
            >
              {reason.description}
            </Button>
          </div>
        );
      });
    }

    return (
      <React.Fragment>
        <Form onSubmit={this.props.next(allSelected)}>
          <h1 className={s.title}>Please select at least one reason for this visit</h1>
          <div className={s.checkboxContainer}>{mainReasons}</div>
          <hr />
          <div className={s.checkboxContainer}>{subReasons}</div>
          <div className={s.buttonsBar}>
            <div className={s.alignLeft}>
              <FancyButton muted label="Cancel" type="button" onClick={this.props.cancel} />
            </div>
            <div className={s.alignRight}>
              <FancyButton
                disabled={!allSelected.length || this.props.isLoading}
                loading={this.props.isLoading}
                label="Next"
                type="submit"
              />
            </div>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}
