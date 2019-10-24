import React from 'react';
import PrivateRoute from './components/PrivateRoute';
import Tabs from './components/Tabs';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter as Router , Route, Switch, Link} from 'react-router-dom';
import Nav from './components/Nav';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Nav/>
      <Switch>
      <PrivateRoute exact path  = '/tabs' component = {Tabs}/>
      <Route exact path  = '/' component = {Login}/>
      <Route
              exact
              path="/register"
              render={props => <Register {...props} />}
            />{" "}
    </Switch>
    </div>
    </Router>
  );
}

export default App;
