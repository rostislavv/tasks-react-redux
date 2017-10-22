import React, { Component } from 'react';
import './App.css';
import PeopleContainer from './components/PeopleContainer';

import { Switch, Route } from 'react-router-dom'
import Tasks from './components/tasks/Tasks'
import Login from './components/login/Login'
import AsyncApp from './components/reddit/AsyncApp';


class App extends Component {
  render() {
    return (
     <Switch>
       <Route exact path='/' component={Login}/>
       <Route path='/start-page' component={PeopleContainer}/>
       <Route path='/tasks' component={Tasks}/>
     </Switch>
    );
  }
}

export default App;
