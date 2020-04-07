import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './app/components/Home';
import Landing from './app/pages/Landing';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={() => <Landing />} />
          <Route exact path='/about' component={() => <Landing />} />
          <Route exact path='/help' component={() => <Landing />} />
          <Route
            path='/home'
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={Home} exact />
                <Route path={`${url}/day`} component={Home} />
                <Route path={`${url}/details`} component={Home} />
              </>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
