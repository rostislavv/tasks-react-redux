import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'

const tableData = [
  { name: 'John', age: 15, gender: 'Male' },
  { name: 'Amber', age: 40, gender: 'Female' },
  { name: 'Leslie', age: 25, gender: 'Female' },
  { name: 'Ben', age: 70, gender: 'Male' },
]

const tasks = [
  { owner: 'admin', performer: 'admin',
  state: 'open', date: '22.10.2017',
  description: 'Do stuff'},
  { owner: 'admin', performer: 'user', state: 'done', date: '21.10.2017', description: 'Done stuff'}
];

export default class TasksTable extends Component {
  state = {
    column: null,
    data: tasks,
    direction: null,
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
      <Table sortable celled>
        <Table.Header>
          <Table.Row>
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
            <Table.HeaderCell>
              Edit
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ id = 0, owner, state, date, description }) => (
            <Table.Row key={date}>
              <Table.Cell>{owner}</Table.Cell>
              <Table.Cell>{state}</Table.Cell>
              <Table.Cell>{date}</Table.Cell>
              <Table.Cell>{description}</Table.Cell>
              <Table.Cell  textAlign='right' width='1'>
                <Button icon size='small' color='green' onClick={() => console.log('Edit of ', id)}>
                  <Icon name='edit' />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>
              <Button floated='right' icon labelPosition='left' primary size='small'>
                <Icon name='tasks' /> Add Task
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}
