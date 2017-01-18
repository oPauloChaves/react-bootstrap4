import React from 'react';

import styles from './App.scss';
import webpackimg from '../assets/img/webpack2.png'

const App = () => (
  <div className={styles.app}>
    <h2>Hello, Paulo Chaves!</h2>
    <br />
    <img src={ webpackimg } alt="Webpack 2 logo" />
  </div>
);

export default App;
