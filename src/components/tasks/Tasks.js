import React, { Component } from 'react';
import { isLoggedOut } from '../../lib/auth';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Button }  from 'semantic-ui-react';

import { fetchLogout } from '../../actions/auth-actions';

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
    <div>
      <Button content='Log out' onClick={this.logOut} />
      <ul>
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>
      </ul>
    </div>
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
