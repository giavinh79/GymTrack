import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import { DetailsPage, HomePage, LandingPage } from 'app/screens';
import Homebar from './app/components/Home/Homebar';
import firebase from './auth/firebase';
import { loginUser, logoutUser, selectAuth } from './slices/authSlice';

import './app/styles/global.scss';

interface IProtectedRoute {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ component: Component, path, exact }): ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('expectSignIn', '1');
        dispatch(loginUser());
      } else {
        // maybe I should show loginModal here
        localStorage.removeItem('expectSignIn');
        dispatch(logoutUser());
      }
    });
  }, [dispatch]);

  if (useSelector(selectAuth) || localStorage.getItem('expectSignIn')) {
    return <Route exact={exact} path={path} render={(props) => <Component {...props} />} />;
  }

  return <Redirect push to='/' />;
};

function App() {
  return (
    <div className='app-wrapper'>
      <Router>
        <Switch>
          <Route path='/' component={() => <LandingPage />} exact />
          <Route
            path='/home'
            render={({ match: { url } }) => (
              <>
                <Homebar />

                <div className='body-wrapper'>
                  <ProtectedRoute component={HomePage} path={`${url}/`} exact />
                  <ProtectedRoute component={DetailsPage} path={`${url}/details`} />
                </div>
              </>
            )}
          />
          <Redirect push to='/' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
