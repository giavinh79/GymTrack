// import React, { ReactElement, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { BrowserRouter as Router, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

// import { DetailsPage, HomePage, LandingPage } from 'src/screens';
// import Homebar from './features/home/Homebar';
// import { loginUser, logoutUser, selectAuth } from './slices/auth/authSlice';
// import { auth } from './auth/firebase';

import './styles/global.scss';
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';

// interface IProtectedRoute {
//   component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
//   path: string;
//   exact?: boolean;
// }

// const ProtectedRoute: React.FC<IProtectedRoute> = ({ component: Component, path, exact }): ReactElement => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         localStorage.setItem('expectSignIn', '1');
//         dispatch(loginUser());
//       } else {
//         // maybe I should show loginModal here
//         // why do i have this local storage item?? wtf1
//         localStorage.removeItem('expectSignIn');
//         dispatch(logoutUser());
//       }
//     });
//   }, [dispatch]);

//   if (useSelector(selectAuth) || localStorage.getItem('expectSignIn')) {
//     return <Route exact={exact} path={path} render={(props) => <Component {...props} />} />;
//   }

//   return <Redirect push to='/' />;
// };

function App() {
  return (
    <div className='app-wrapper'>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

      {/* <Router>
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
      </Router> */}
    </div>
  );
}

export default App;
