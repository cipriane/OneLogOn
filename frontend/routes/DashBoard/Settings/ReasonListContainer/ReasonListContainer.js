import React, { Component } from 'react';
import SettingsContainer from '../SettingsContainer/SettingsContainer';
import ReasonList from 'common/Reasons/ReasonList/ReasonList';
import myFetch from 'utils/fetch';
import s from './ReasonListContainer.css';

export default class ReasonListContainer extends Component {
  state = {
    reasons: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    try {
      this.setState({
        error: null,
        isLoading: true,
      });
      const data = await myFetch('/api/visitreasons');

      this.setState({
        reasons: data,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  }

  addReason = async (input, isMain) => {
    try {
      this.setState({
        error: null,
        isLoading: true,
      });
      const reason = await myFetch('/api/visitreason/create', {
        method: 'POST',
        body: {
          is_main_reason: isMain,
          description: input,
        },
      });

      this.setState(prevState => ({
        reasons: [reason, ...prevState.reasons],
        isLoading: false,
        input: '',
      }));
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  };

  deleteReason = async id => {
    try {
      const { reasons } = this.state;
      this.setState({
        error: null,
        isLoading: true,
      });
      await myFetch(`/api/visitreason/${id}/delete`, {
        method: 'DELETE',
      });
      this.setState(prevState => ({
        reasons: prevState.reasons.filter(reason => {
          return reason.id !== id;
        }),
        isLoading: false,
      }));
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  };

  editReason = async (id, key, value) => {
    try {
      const { input, reasons } = this.state;
      this.setState({
        error: null,
        isLoading: true,
      });
      const updatedReason = await myFetch(`/api/visitreason/${id}/update`, {
        method: 'PATCH',
        body: {
          [key]: value,
        },
      });
      this.setState(prevState => {
        // Update description of edited reason
        const index = prevState.reasons.findIndex(reason => reason.id === id);
        prevState.reasons[index][key] = value;
        return {
          reasons: prevState.reasons,
          isLoading: false,
        };
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  };

  render() {
    const { reasons } = this.state;
    const mainReasons = reasons.filter(reason => reason.is_active && reason.is_main_reason);
    const subReasons = reasons.filter(reason => reason.is_active && !reason.is_main_reason);
    const archivedReasons = reasons.filter(reason => !reason.is_active);

    return (
      <React.Fragment>
        <SettingsContainer label={'Main Reasons'}>
          <ul className={s.listInformation}>
            <li>Main reasons are the first reasons shown to visitors</li>
            <li>Only one main reason may be selected</li>
            <li>Main reasons may optionally display sub reasons</li>
          </ul>
          <ReasonList
            reasons={mainReasons}
            addReason={this.addReason}
            editReason={this.editReason}
            deleteReason={this.deleteReason}
            isMain
          />
        </SettingsContainer>

        <SettingsContainer label={'Sub Reasons'}>
          <ul className={s.listInformation}>
            <li>Sub reasons are displayed to visitors after a main reason has been selected</li>
            <li>Visitors may select multiple sub reasons</li>
          </ul>
          <ReasonList
            reasons={subReasons}
            addReason={this.addReason}
            editReason={this.editReason}
            deleteReason={this.deleteReason}
          />
        </SettingsContainer>

        <SettingsContainer label={'Archived Reasons'}>
          <ul className={s.listInformation}>
            <li>Archived reasons will be hidden from visitors</li>
            <li>The reasons may still be viewed as statistics</li>
          </ul>
          <ReasonList
            reasons={archivedReasons}
            addReason={this.addReason}
            editReason={this.editReason}
            deleteReason={this.deleteReason}
            isArchive
          />
        </SettingsContainer>
      </React.Fragment>
    );
  }
}
