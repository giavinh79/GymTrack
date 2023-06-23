import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// internationalization with i18next
import './i18n';

import { store } from './stores/rootStore';
import App from './App';

// styles
import 'animate.css';
import './index.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
