//Dependencies
import React from 'react'
import { Router, BrowserRouter, Route, Routes } from 'react-router-dom';

//css 
import 'bootstrap/dist/css/bootstrap.css';
import './assests/css/theme.default.css';
import './assests/css/custom.css';

//Components
import Dashboard from './pages/oderentry/Dashboard';



function App() {
  return (
    <div>
     <Dashboard/>
    </div>
  )
}

export default App
