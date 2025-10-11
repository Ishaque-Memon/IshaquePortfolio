import React, { StrictMode, Fragment } from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './styles/globals.css'
import { Provider } from 'react-redux';
import store from './redux/store';

// Avoid StrictMode in development to prevent double-invoked effects (duplicate animations/IO)
const Wrapper = import.meta.env.MODE === 'development' ? Fragment : StrictMode;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Wrapper>
      <App />
    </Wrapper>
  </Provider>
)
