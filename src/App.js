import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom'
import Tasks from './components/tasks/Tasks'
import Login from './components/login/Login'


class App extends Component {
  render() {
    return (
     <Switch>
       <Route exact path='/' component={Login}/>
       <Route path='/tasks' component={Tasks}/>
     </Switch>
    );
  }
}

export default App;
