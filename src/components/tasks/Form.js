import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import _ from 'lodash';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currentChange } from '../../actions/task-actions';

const performers = [ 'admin', 'user' ];
const states = [ 'open', 'done' ];

class TaskForm extends Component {
  state = {}

  handleChange = (prop) => (e, { value }) => {
    this.props.dispatch(currentChange(prop, value))
    this.setState({ value })
  }

  render() {
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Select label='Performer'
            value={this.props.task.performer}
            options={performers.map(name => ({key: name, text: name, value: name}))}
            placeholder='Performer'
            onChange={this.handleChange('performer')} />
          <Form.Select label='State'
            value={this.props.task.state}
            options={states.map(state => ({key: state, text: state, value: state}))}
            placeholder='State'
            onChange={this.handleChange('state')} />
        </Form.Group>
        <Form.TextArea label='Description'
           value={this.props.task.description}
           placeholder='Write something about this task'
           onChange={this.handleChange('description')} />
      </Form>
    )
  }
}

TaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ task }) {
  return {
    task: task.task,
  }
}

export default connect(mapStateToProps)(TaskForm)
