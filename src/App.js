import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import 'react-notifications/lib/notifications.css';

import { Switch, Route } from 'react-router-dom'
import Tasks from './components/tasks/Tasks'
import Users from './components/users/Users.js'
import Regression from './components/regression/Regression.js'
import Login from './components/login/Login'


class App extends Component {
  render() {
    return (
     <Switch>
       <Route exact path='/' component={Login}/>
       <Route path='/tasks' component={Tasks}/>
       <Route path='/users' component={Users}/>
       <Route path='/regression' component={Regression}/>
     </Switch>
    );
  }
}

export default App;
