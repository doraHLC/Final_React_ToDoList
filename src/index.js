import React from 'react';
import { HashRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserTokenProvider, UserNicknameProvider } from './contexts/UserContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserTokenProvider>
    <UserNicknameProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </UserNicknameProvider>
  </UserTokenProvider>
);
