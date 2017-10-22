import React, { Component } from 'react';
import { Modal, Button }  from 'semantic-ui-react';

class ConfirmModal extends Component {
  state = {
    open: false,
    handler: null
  }

  handleOpen = (fn) => {
    this.setState({
      open: true,
      handler: fn
   })
  }
  handleDelete = () => {
    this.state.handler();
    this.setState({ open: false })
  }
  handleExit = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <Modal
         open={this.state.open}
         onClose={this.handleExit}
         closeIcon
         size='small'>
          <Modal.Header>Are you sure?</Modal.Header>
          <Modal.Actions>
            <Button icon='delete' content='Cancel'
              color='green' onClick={this.handleExit} />
            <Button icon='check' content='Delete'
              color='red' onClick={this.handleDelete} />
          </Modal.Actions>
       </Modal>
    )
  }
}

export default ConfirmModal;
