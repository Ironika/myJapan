import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import firebase from './firebase'
// import Axios from 'axios';

// Axios.get('https://us-central1-myjapan-71e51.cloudfunctions.net/api/news').then((data) => console.log(data))

if(!localStorage.getItem('cache'))
    localStorage.setItem('cache', JSON.stringify({}))

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
