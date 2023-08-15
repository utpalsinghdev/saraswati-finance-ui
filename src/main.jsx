import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { ToastContainer } from "react-toast";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ToastContainer delay={3000} position="top-center" />
    <App />
  </React.StrictMode>,
)
