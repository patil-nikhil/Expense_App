import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore from './Redux/Store/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import 'bootstrap/dist/js/bootstrap.bundle';


const store = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
          <App />
    </BrowserRouter>
  </Provider>
);

