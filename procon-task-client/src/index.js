import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
const loading = (
  <div> Loading...</div>
);

ReactDOM.render(
  <Suspense fallback={loading}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);