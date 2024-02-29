import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider.jsx'
import DataContextProvider from './contexts/DataContextProvider.jsx'
import ChatContextProvider from './contexts/ChatContextProvider.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
      <AuthProvider>
        <DataContextProvider>
        <ChatContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          </ChatContextProvider>
        </DataContextProvider>
      </AuthProvider>
  </React.StrictMode>,

)
