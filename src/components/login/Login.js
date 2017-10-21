import React from 'react'
import { Grid, Header }  from 'semantic-ui-react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

const Login = () => (
    <Grid columns='equal'>
    <Grid.Column></Grid.Column>
    <Grid.Column>
      <Header size='medium' textAlign='center' style={{ 'marginTop' : 10}}>
        Login
      </Header>
      <Form style={{ 'marginTop' : 25 }}>
        <Form.Field>
          <label>Login</label>
          <input placeholder='Login' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' placeholder='Password' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
      </Grid.Column>
    <Grid.Column></Grid.Column>
  </Grid>
)

export default Login;
