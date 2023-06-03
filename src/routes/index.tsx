import { ReactElement, useEffect } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';

import { auth } from 'src/auth/firebase';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = (): ReactElement | null => {
  const element = useRoutes([...publicRoutes, ...protectedRoutes]);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && pathname === '/') {
        navigate('/home');
      }
    });

    return () => unsubscribe();
  }, [navigate, pathname]);

  return element;
};
