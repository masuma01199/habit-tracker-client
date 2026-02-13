import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "./index.css";
import App from './App'
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter >
    <AuthProvider >
      <App />
      <Toaster position="top-right" />  
    </AuthProvider>
    
  </BrowserRouter>
)