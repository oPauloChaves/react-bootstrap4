import React from 'react'
import { render } from 'react-dom'

import webpackImg from './assets/img/webpack2.png'
import './app.css'

const App = () => (
  <div className="page">
    <h1>Webpack 2 is Awesome!!!</h1>

    <h3>Import image within the JS file</h3>
    <img src={ webpackImg } alt="" className="img-exaple"/>
  </div>
)

render(
  <App />,
  document.getElementById('root')
)
