import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="70832872454-h5avfski2udjovt3vsr4jhoqjuhidpgc.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




reportWebVitals();
