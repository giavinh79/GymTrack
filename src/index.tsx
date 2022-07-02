import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// i18n internationalization/translations
import './locales/i18n';

import { store } from './stores/rootStore';
import App from './App';

// styles
import 'animate.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
