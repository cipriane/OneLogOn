import React, {Component} from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home/Home';
import ReduxExample from 'routes/ReduxExample/ReduxExample';
import Login from 'routes/Login/Login';
import Register from 'routes/Register/Register';
import NoMatch from 'routes/NoMatch/NoMatch';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/ReduxExample' component={ReduxExample} />
          <Route component={NoMatch}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
