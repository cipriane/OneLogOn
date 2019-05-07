import React, { Component } from 'react';
import SettingsContainer from '../SettingsContainer/SettingsContainer';
import ReasonList from 'common/Reasons/ReasonList/ReasonList';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import myFetch from 'utils/fetch';
import s from './ReasonListContainer.css';

export default class ReasonListContainer extends Component {
  state = {
    reasons: [],
    idToDelete: null,
    showDeleteConfirmation: false,
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

  showDeleteConfirmation = id => {
    this.setState({
      showDeleteConfirmation: true,
      idToDelete: id,
    });
  };

  hideDeleteConfirmation = () => {
    this.setState({
      showDeleteConfirmation: false,
      idToDelete: null,
    });
  };

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

  deleteReason = async () => {
    try {
      const { reasons, idToDelete } = this.state;
      this.setState({
        error: null,
        isLoading: true,
      });
      await myFetch(`/api/visitreason/${idToDelete}/delete`, {
        method: 'DELETE',
      });
      this.setState(prevState => ({
        reasons: prevState.reasons.filter(reason => {
          return reason.id !== idToDelete;
        }),
        isLoading: false,
        showDeleteConfirmation: false,
        idToDelete: null,
      }));
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  };

  editReason = async (id, updatedValues) => {
    try {
      const { input, reasons } = this.state;
      this.setState({
        error: null,
        isLoading: true,
      });
      // replace falsy with 0 for Django
      Object.keys(updatedValues).map(key => {
        if (!updatedValues[key]) {
          updatedValues[key] = 0;
        }
      });
      const updatedReason = await myFetch(`/api/visitreason/${id}/update`, {
        method: 'PATCH',
        body: {
          ...updatedValues,
        },
      });
      this.setState(prevState => {
        // Update description of edited reason
        const index = prevState.reasons.findIndex(reason => reason.id === updatedReason.id);
        prevState.reasons[index] = updatedReason;
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
            deleteReason={this.showDeleteConfirmation}
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
            deleteReason={this.showDeleteConfirmation}
          />
        </SettingsContainer>

        <SettingsContainer label={'Archived Reasons'}>
          <ul className={s.listInformation}>
            <li>Archived reasons are hidden from visitors</li>
            <li>The reasons will continue to show in statistics</li>
          </ul>
          <ReasonList
            reasons={archivedReasons}
            addReason={this.addReason}
            editReason={this.editReason}
            deleteReason={this.showDeleteConfirmation}
            isArchive
          />
        </SettingsContainer>
        <DeleteConfirmationModal
          show={this.state.showDeleteConfirmation}
          cancel={this.hideDeleteConfirmation}
          confirm={this.deleteReason}
        />
      </React.Fragment>
    );
  }
}
