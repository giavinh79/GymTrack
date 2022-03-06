import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

import { AppRoutes } from 'src/routes';
import { theme } from 'src/styles/theme';
import 'src/styles/global.scss';

function App() {
  return (
    <div className='app-wrapper'>
      <BrowserRouter>
        <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
          <AppRoutes />
        </MantineProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
