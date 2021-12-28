import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes';

import './styles/global.scss';

function App() {
  return (
    <div className='app-wrapper'>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
