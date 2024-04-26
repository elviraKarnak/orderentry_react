//Dependencies
import React from 'react'
import {MemoryRouter, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';

//css 
import './assests/css/theme.default.css';
import './assests/css/custom.css';

//Components
import Header from './common/Header';
import Dashboard from './pages/oderentry/Dashboard';
import OrderList from './pages/oderentry/OrderList';
import OrderView from './pages/oderentry/OrderView';
import SatagingInventory from './pages/staginginvemntoty/SatagingInventory';




function App() {
  return (
    <Container maxWidth="ex">
    <MemoryRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/order-list' element={<OrderList />} />
        <Route path='/order-view' element={<Dashboard />} />
        <Route path='/staging-inventory' element={<SatagingInventory />} />
      </Routes>
    </MemoryRouter>
    </Container>
  )
}

export default App
