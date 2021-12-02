import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons'
import "../node_modules/uikit/dist/js/uikit.min.js";
import Avatar from "./images/avatar.jpg"
import { ApiProvider } from './utils/ApiContext';
const { BrowserRouter } = require("react-router-dom")


UIkit.use(Icons);

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


