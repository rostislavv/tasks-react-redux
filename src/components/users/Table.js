import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

import moment from 'moment';
import { connect } from 'react-redux';
import { fetchUsers } from '../../reducers/users';
import {
  openModal, closeModal,
} from '../../reducers/users';


class TasksTable extends Component {
  constructor(props){
    super(props);
  }
  state = {
    column: null,
    data: [],
    direction: null,
    redirect: false
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchUsers());
  }
  componentWillReceiveProps(props){
    this.setState({
      data: props.users.map(e => e.userInfo)
    })
  }
  showModal(id) {
    console.log('id', id);
    this.props.dispatch(openModal());
  }
  showChart(id) {
    console.log(this.props);
    this.setState({redirect: true})
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
    const { column, data, direction, redirect } = this.state
    if ( redirect ){
      return <Redirect to='/regression'/>
    }

    return (
      <div>
        <Table sortable celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={this.handleSort('name')}>
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'surname' ? direction : null}
                onClick={this.handleSort('surname')}>
                Surname
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'city' ? direction : null}
                onClick={this.handleSort('city')}>
                City
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'profession' ? direction : null}
                onClick={this.handleSort('profession')}>
                Profession
              </Table.HeaderCell>
               <Table.HeaderCell>
                Recommend
              </Table.HeaderCell>
              <Table.HeaderCell>
                Analyze
              </Table.HeaderCell>
            <Table.HeaderCell>
                Predict
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ id, name, surname, city, profession }) => (
              <Table.Row key={Math.random().toString()}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{surname}</Table.Cell>
                <Table.Cell>{city}</Table.Cell>
                <Table.Cell>{profession}</Table.Cell>
                <Table.Cell  textAlign='right' width='1'>
                  <Button icon size='small' color='red'
                    onClick={() => this.showModal(name+surname)}>
                    <Icon name='delete' />
                  </Button>
                </Table.Cell>
                <Table.Cell  textAlign='right' width='1'>
                  <Button icon size='small' color='yellow'
                    onClick={() => this.showModal(name+surname)}>
                    <Icon name='delete' />
                  </Button>
                </Table.Cell>
                <Table.Cell  textAlign='right' width='1'>
                  <Button icon size='small' color='green'
                    onClick={() => this.showChart(name+surname)}>
                    <Icon name='delete' />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='8'>
                <Button floated='right' icon
                  labelPosition='left' primary size='small'
                  onClick={() => this.showModal('add')}>
                  <Icon name='tasks' /> Add Task
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    )
  }
}


TasksTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ users }) {
  return {
    error: users.error,
    loading: users.loading,
    users: users.users,
    message: users.message
  }
}

export default withRouter(connect(mapStateToProps)(TasksTable));
