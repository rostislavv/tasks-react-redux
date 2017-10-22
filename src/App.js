import React, { Component } from 'react';
import './App.css';
import PeopleContainer from './components/PeopleContainer';

import { Switch, Route } from 'react-router-dom'
import Tasks from './components/tasks/Tasks'
import Login from './components/login/Login'

import { Header, Container }  from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Container>
        <Header style={{ 'marginTop': 15 }} dividing size='large'>Tasks</Header>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/start-page' component={PeopleContainer}/>
            <Route path='/tasks' component={Tasks}/>
          </Switch>
      </Container>
    );
  }
}

export default App;
