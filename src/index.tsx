import ReactDOM from 'react-dom';
import App from './App';
import { store } from './stores/rootStore';
import { Provider } from 'react-redux';

import './locales/i18n';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
