import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import HomePage from './app/screens/HomePage';
import LandingPage from './app/screens/LandingPage';
import Homebar from './app/components/Home/Homebar';
import DetailsPage from './app/screens/DetailsPage';
import firebase from './auth/firebase';
import { loginUser, logoutUser, selectAuth } from './slices/authSlice';
import './app/styles/global.scss';

const ProtectedRoute: React.FC<{
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path: string;
  exact: boolean;
}> = ({ component: Component, path, exact }): ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('expectSignIn', '1');
        dispatch(loginUser());
      } else {
        // maybe I should show loginModal here and render the component here as well
        localStorage.removeItem('expectSignIn');
        dispatch(logoutUser());
      }
    });
  }, [dispatch]);

  if (useSelector(selectAuth) || localStorage.getItem('expectSignIn')) {
    return <Route exact={exact} path={path} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect push to='/' />;
  }
};

function App() {
  useEffect(() => {}, []);

  return (
    <div className='app-wrapper'>
      <Router>
        <Switch>
          <Route path='/' component={() => <LandingPage />} exact />
          {/* <Route exact path='/about' component={() => <LandingPage />} /> */}
          <Route
            path='/home'
            render={({ match: { url } }) => (
              <>
                <Homebar />

                <div className='body-wrapper'>
                  <ProtectedRoute component={HomePage} path={`${url}/`} exact />
                  <Route path={`${url}/details`} component={DetailsPage} />
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
