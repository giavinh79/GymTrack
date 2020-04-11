import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './app/pages/HomePage';
import LandingPage from './app/pages/LandingPage';
import './App.css';
import Homebar from './app/components/Homebar';
import DetailsPage from './app/pages/DetailsPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={() => <LandingPage />} />
          <Route exact path='/about' component={() => <LandingPage />} />
          <Route exact path='/help' component={() => <LandingPage />} />
          <Route
            path='/home'
            render={({ match: { url } }) => (
              <>
                <Homebar />

                <div style={{ backgroundColor: '#F8F9FA', width: '100%' }}>
                  <Route path={`${url}/`} component={HomePage} exact />
                  <Route path={`${url}/details`} component={DetailsPage} />
                </div>
                {/* <Route path={`${url}/details`} component={HomePage} /> */}
              </>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
