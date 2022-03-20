import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './stores/rootStore';

// i18n internationalization/translations
import './locales/i18n';

// styles
import 'animate.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
