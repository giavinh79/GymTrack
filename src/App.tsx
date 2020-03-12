import React from 'react';
import Home from './app/components/Home';
import { Counter } from './features/counter/Counter';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/home' component={() => <Home />} />
          <Route path='/home/day' component={() => <Home />} />
          <Route path='/home/day/edit' component={() => <Home />} />
          <Route path='/' component={() => <Counter />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
