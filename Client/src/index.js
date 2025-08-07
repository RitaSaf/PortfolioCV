import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MessageProvider } from './context/MessageContext'; // 👈 Add this line

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MessageProvider>   {/* 👈 Wrap App with context provider */}
      <App />
    </MessageProvider>
  </React.StrictMode>
);

reportWebVitals();
