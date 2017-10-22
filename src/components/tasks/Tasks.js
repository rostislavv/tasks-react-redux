import React, { Component } from 'react';
import { isLoggedOut } from '../../lib/auth';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Button }  from 'semantic-ui-react';
import { Header, Container, Divider, Icon, Modal }  from 'semantic-ui-react';

import { fetchLogout } from '../../actions/auth-actions';

import TasksTable from './Table';
import TaskModal from './Modal';

class Tasks extends Component {
    constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  componentWillMount() {
    if (isLoggedOut()){
      this.props.history.push('/');
    }
  }
  componentWillUpdate() {
    if (isLoggedOut()) {
      this.props.history.push('/');
    }
  }

  logOut(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(fetchLogout());
  }
  render() {
    return (
      <Container>
        <div  style={{ 'display' : 'block', 'height' : 45}}>
            <Header style={{ 'marginTop' : 15 }} floated='left' size='large'>Tasks</Header>
            <Button style={{ 'marginTop' : 15 }} floated='right' icon onClick={this.logOut} >
              <Icon name='sign out' /> Logout
            </Button>
       </div>
        <Divider/>
        <Header size='small'>Your and assigned to you tasks</Header>
        <div></div>
        <TasksTable/>
        <TaskModal/>
      </Container>
    )
  }
}

Tasks.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({auth}){
  return {
    error: auth.error,
    loading: auth.loading,
    message: auth.message
  }
}

export default withRouter(connect(mapStateToProps)(Tasks));
