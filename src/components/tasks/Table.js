import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types';

import moment from 'moment';
import { connect } from 'react-redux';
import { fetchTasks } from '../../actions/tasks-actions';
import {
  fetchTask, openModal, closeModal,
  currentSet, fetchDeleteTask
} from '../../actions/task-actions';

import ConfirmModal from './ConfirmModal';

class TasksTable extends Component {
  state = {
    column: null,
    data: [],
    direction: null,
  }

  componentWillMount() {
    this.props.dispatch(fetchTasks());
  }
  componentWillReceiveProps({tasks}){
    this.setState({ data: tasks })
  }

  deleteTask(id) {
    this.refs.confirm.handleOpen(() => {
      this.props.dispatch(fetchDeleteTask(id));
    });
  }

  showModal(type, id) {
    if(type === 'edit') {
      this.props.dispatch(
        currentSet(
          _.find(this.props.tasks, { id })
        )
      )
    } else {
      this.props.dispatch(currentSet());
    }
    this.props.dispatch(openModal(type));
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })
      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { column, data, direction } = this.state
    return (
      <div>
        <Table sortable celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'date' ? direction : null}
                onClick={this.handleSort('date')}>
                Date
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'description' ? direction : null}
                onClick={this.handleSort('description')}>
                Description
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'owner' ? direction : null}
                onClick={this.handleSort('owner')}>
                Owner
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'state' ? direction : null}
                onClick={this.handleSort('state')}>
                State
              </Table.HeaderCell>
              <Table.HeaderCell>
                Edit
              </Table.HeaderCell>
              <Table.HeaderCell>
                Delete
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ id, owner, state, date, description }) => (
              <Table.Row key={id}>
                <Table.Cell>{moment(date).format('YYYY-MM-DD HH:mm:ss')}</Table.Cell>
                <Table.Cell>{description}</Table.Cell>
                <Table.Cell>{owner}</Table.Cell>
                <Table.Cell>{state}</Table.Cell>
                <Table.Cell  textAlign='right' width='1'>
                  <Button icon size='small' color='green'
                    onClick={() => this.showModal('edit', id)}>
                    <Icon name='edit' />
                  </Button>
                </Table.Cell>
                <Table.Cell  textAlign='right' width='1'>
                  <Button icon size='small' color='red'
                    onClick={() => this.deleteTask(id)}>
                    <Icon name='delete' />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='6'>
                <Button floated='right' icon
                  labelPosition='left' primary size='small'
                  onClick={() => this.showModal('add')}>
                  <Icon name='tasks' /> Add Task
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <ConfirmModal ref='confirm'/>
      </div>
    )
  }
}


TasksTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ tasks }) {
  return {
    error: tasks.error,
    loading: tasks.loading,
    tasks: tasks.tasks,
    message: tasks.message
  }
}

export default connect(mapStateToProps)(TasksTable);
