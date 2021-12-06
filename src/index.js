import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import "../node_modules/uikit/dist/js/uikit.min.js";
import { ApiProvider } from './utils/ApiContext';
import Footer from "./components/Footer/index.js"
const { BrowserRouter } = require("react-router-dom")

UIkit.use(Icons);

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider>
      <BrowserRouter>
        <App />
        < Footer />
      </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


