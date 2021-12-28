import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';

import { auth } from 'src/auth/firebase';
import { loginUser } from 'src/slices';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const element = useRoutes([...publicRoutes, ...protectedRoutes]);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginUser());

        if (pathname === '/') {
          navigate('/home');
        }
      }
    });
  }, [navigate, pathname, dispatch]);

  return element;
};
