import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal, Button }  from 'semantic-ui-react';
import {
  openModal, closeModal,
} from '../../reducers/users';

class TaskModal extends Component {

  handleOpen = () => {
    this.props.dispatch(openModal());
  }
  handleClose = () => {
    const { task, dispatch } = this.props;
    if(this.props.modal_mode === 'add'){
      this.props.dispatch(fetchSaveTask(task));
    } else {
      this.props.dispatch(fetchEditTask(task.id, task))
    }
    dispatch(closeModal());
  }
  handleExit = () => {
    this.props.dispatch(closeModal());
  }

  render() {
    return (
      <Modal
         open={this.props.modal_open}
         onClose={this.handleExit}
         closeIcon
         size='small'>
          <Modal.Header>header</Modal.Header>
          <Modal.Content>
            <div>
              <h3>sjdflasjflasjdf;ljsdlfjals;djflasjdfsjdf</h3>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button icon='check' content='Save' onClick={this.handleClose} />
          </Modal.Actions>
       </Modal>
    )
  }
}

TaskModal.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  modal_open: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ users }) {
  return {
    error: users.error,
    loading: users.loading,
    modal_open: users.modal_open,
  }
}

export default connect(mapStateToProps)(TaskModal);
