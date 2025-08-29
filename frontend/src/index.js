import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // This imports the global styles and Tailwind directives
import App from './App';

// This finds the 'root' div in index.html and tells React to render
// the main App component inside of it.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);