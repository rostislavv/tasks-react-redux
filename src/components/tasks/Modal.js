import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal, Button }  from 'semantic-ui-react';

import { fetchTask, openModal, closeModal } from '../../actions/task-actions';

class TaskModal extends Component {

  handleOpen = () => {
    this.props.dispatch(openModal());
  }
  handleClose = () => {
    this.props.dispatch(closeModal());
  }

  render() {
    const header = this.props.modal_mode === 'add' ? 'Add new task' : 'Edit task';
    return (
      <Modal
         open={this.props.modal_open}
         onClose={this.handleClose}
         closeIcon
         size='small'>
          <Modal.Header>{header}</Modal.Header>
          <Modal.Content>
            <p>Thats everything!</p>
          </Modal.Content>
          <Modal.Actions>
            <Button icon='check' content='All Done' onClick={this.handleClose} />
          </Modal.Actions>
       </Modal>
    )
  }
}

TaskModal.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  task: PropTypes.object.isRequired,
  modal_open: PropTypes.bool.isRequired,
  modal_mode: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ task }) {
  return {
    error: task.error,
    loading: task.loading,
    task: task.task,
    modal_open: task.modal_open,
    modal_mode: task.modal_mode,
    message: task.message
  }
}

export default connect(mapStateToProps)(TaskModal);
