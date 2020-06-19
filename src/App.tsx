import React, { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import HomePage from './app/screens/HomePage';
import LandingPage from './app/screens/LandingPage';
import Homebar from './app/components/Home/Homebar';
import DetailsPage from './app/screens/DetailsPage';
import firebase from './auth/firebase';
import './app/styles/global.scss';

const ProtectedRoute: React.FC<{
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path: string;
  exact: boolean;
}> = ({ component: Component, path, exact }): ReactElement => {
  // if (!localStorage.getItem('expectSignIn')) return <Redirect push to='/' />;
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        localStorage.setItem('expectSignIn', '1');
        setAuthenticated(true);
      } else {
        // maybe I should show loginModal here and render the component here as well
        localStorage.removeItem('expectSignIn');
        setAuthenticated(false);
      }
    });
  }, []);
  if (authenticated || localStorage.getItem('expectSignIn')) {
    return <Route exact={exact} path={path} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect push to='/' />;
  }
};

// const ProtectedRoute: React.FC<{
//   component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
//   path: string;
// }> = ({ component: Component, path }) => {
//   const [authenticated, setAuthenticated] = useState(null);
//   useEffect(() => {
//     async function getToken() {
//       try {
//         await checkAuth();
//         setAuthenticated(true);
//       } catch (err) {
//         setAuthenticated(false);
//       }
//     }
//     getToken();
//   }, []);

//   return <Route path={path} render={(props) => <Component {...props} />} />;

//   if (authenticated == null) {
//     return <></>;
//   } else if (authenticated) {
//     return <Route {...rest} render={(props) => <Component {...props} />} />;
//   } else {
//     return <Route {...rest} render={() => <Redirect to='/' />} />;
//   }
// };

function App() {
  return (
    <div className='app-wrapper'>
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
                  <ProtectedRoute component={HomePage} path={`${url}/`} exact={true} />
                  {/* <Route path={`${url}/`} component={HomePage} exact /> */}
                  <Route path={`${url}/details`} component={DetailsPage} />
                </div>
                {/* <Route path={`${url}/details`} component={HomePage} /> */}
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
