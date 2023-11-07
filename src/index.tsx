import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import '../styles.css';

console.log('Hello World');

createRoot(document.getElementById('root')).render(<App />);
