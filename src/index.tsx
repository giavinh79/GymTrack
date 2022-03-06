import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import App from './App';
import { store } from './stores/rootStore';

// i18n internationalization/translations
import './locales/i18n';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';

if (window.location.hostname !== 'localhost') {
  Sentry.init({
    dsn: 'https://db739f10f70b4ec187cd546b19b38362@o1113987.ingest.sentry.io/6144880',
    integrations: [new Integrations.BrowserTracing()],

    // Transaction performance monitoring
    tracesSampleRate: 0.3,
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
