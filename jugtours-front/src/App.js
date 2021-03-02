import React, { Component, Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const Home = lazy(() => import('./Home'));
const GroupList = lazy(() => import('./GroupList'));
const GroupEdit = lazy(() => import('./GroupEdit'));

class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path='/' exact={true} component={Home} />
              <Route path='/groups' exact={true} component={GroupList} />
              <Route path='/groups/:id' component={GroupEdit} />
            </Switch>
          </Suspense>
        </Router>
      </CookiesProvider>
    );
  }
}

export default App;
