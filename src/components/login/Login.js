import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Header, Container, Divider }  from 'semantic-ui-react';
import { Button,  Form } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { isLoggedIn } from '../../lib/auth';
import { fetchLogin } from '../../actions/auth-actions';
import { withRouter } from 'react-router-dom'


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.state = {
      login: '',
      pass: ''
    }
  }

  componentWillUpdate() {
    console.log('Login update', isLoggedIn());
    if (isLoggedIn()) {
      this.props.history.push('/tasks')
    }
  }

  changeUsername(e) {
    this.setState({ login: e.target.value })
  }
  changePassword(e) {
    this.setState({ pass: e.target.value })
  }
  handleClick(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(fetchLogin(this.state.login, this.state.pass));
  }
  render() {
    return (
      <Container>
        <Header style={{ 'marginTop': 15 }} size='large'>Tasks</Header>
        <Divider/>
        <Grid columns='equal'>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <Header size='medium' textAlign='center' style={{ 'marginTop' : 10}}>
              Login
            </Header>
            <Form style={{ 'marginTop' : 25 }}>
              <Form.Field>
                <label>Login</label>
                <input value={this.state.login} onChange={this.changeUsername} placeholder='Login' />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input value={this.state.pass} onChange={this.changePassword} type='password' placeholder='Password' />
              </Form.Field>
              <Button type='submit' onClick={this.handleClick}>
                Submit
              </Button>
            </Form>
            </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid>
    </Container>
    )
  }
}

Login.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({auth}) {
  return {
    error: auth.error,
    loading: auth.loading,
    message: auth.message
  }
}

export default withRouter(connect(mapStateToProps)(Login));
