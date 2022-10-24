import { StrictMode, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import mixpanel from 'mixpanel-browser';

import { AppRoutes } from 'src/routes';
import { theme } from 'src/styles/theme';

import 'src/styles/global.css';

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    (async () => {
      if (window.location.hostname !== 'localhost') {
        // initialize Sentry (error tracking) with public key
        Sentry.init({
          dsn: 'https://db739f10f70b4ec187cd546b19b38362@o1113987.ingest.sentry.io/6144880',
          integrations: [new Integrations.BrowserTracing()],

          // Transaction performance monitoring
          tracesSampleRate: 0.3,
        });

        // initialize Mixpanel Analytics with public key
        mixpanel.init('075e493fcf8445216a8e8041fa94bc1b', {
          debug: false,
        });
      }
    })();
  }, []);

  return (
    <div className='app-wrapper'>
      <StrictMode>
        <BrowserRouter>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withNormalizeCSS withGlobalStyles theme={{ ...theme, colorScheme }}>
              <NotificationsProvider autoClose={4000}>
                <AppRoutes />
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </BrowserRouter>
      </StrictMode>
    </div>
  );
}

export default App;
