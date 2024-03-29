import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider.jsx'
import DataContextProvider from './contexts/DataContextProvider.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
      <AuthProvider>
        <DataContextProvider>

          <BrowserRouter>
            <App />
            <ToastContainer />
          </BrowserRouter>

        </DataContextProvider>
      </AuthProvider>
  </React.StrictMode>,

)
