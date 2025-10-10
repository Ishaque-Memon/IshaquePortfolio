import React, { StrictMode, Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

// Avoid StrictMode in development to prevent double-invoked effects (duplicate animations/IO)
const Wrapper = import.meta.env.MODE === 'development' ? Fragment : StrictMode;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Wrapper>
    <App />
  </Wrapper>,
)
