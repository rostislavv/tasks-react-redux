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

import { subscribeToTimer, subscribeToUpdates } from '../../lib/socket';

import { NotificationManager } from 'react-notifications';

import ConfirmModal from './ConfirmModal';

class TasksTable extends Component {
  constructor(props){
    super(props);

    subscribeToUpdates(() => {
      NotificationManager.info('Warning message', 'Tasks were updated', 2000);
      this.props.dispatch(fetchTasks())
    })
  }
  state = {
    column: null,
    data: [],
    direction: null,
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchTasks());
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
        <Table sortable celled selectable>
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
                Delete
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ id, owner, state, date, description }) => (
              <Table.Row key={id}>
                <Table.Cell onClick={() => this.showModal('edit', id)}>{moment(date).format('YYYY-MM-DD HH:mm:ss')}</Table.Cell>
                <Table.Cell onClick={() => this.showModal('edit', id)}>{description}</Table.Cell>
                <Table.Cell onClick={() => this.showModal('edit', id)}>{owner}</Table.Cell>
                <Table.Cell onClick={() => this.showModal('edit', id)}>{state}</Table.Cell>
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
              <Table.HeaderCell colSpan='5'>
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
