import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const routes = [...publicRoutes, ...protectedRoutes];

  const element = useRoutes(routes);

  return element;
};
