import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import i18n from './i18n';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// i18n.changeLanguage('zh');
i18n.changeLanguage('en');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
