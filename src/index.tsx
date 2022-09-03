import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// i18n internationalization/translations
import './locales/i18n';

import { store } from './stores/rootStore';
import App from './App';

// styles
import 'animate.css';
import './index.css';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
