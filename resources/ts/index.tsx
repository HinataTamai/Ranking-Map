import { render } from 'react-dom';
import React from 'react';
import App from './App';
import '../css/app.css';


const root = document.getElementById('root') as HTMLElement

render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    ,
    root
);