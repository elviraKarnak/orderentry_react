//Dependencies
import React from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import OderDetails from './pages/oderview/OderDetails';

//css 
import './assests/css/theme.default.css';
import './assests/css/theme.boostrap.min.css'
import './assests/css/custom.css';

//Components
import Header from './common/Header';
import Dashboard from './pages/oderview/Dashboard';
import OrderList from './pages/oderview/OrderList';
import OrderView from './pages/oderview/OrderView';
import SatagingInventory from './pages/staginginvemntoty/SatagingInventory';


function App() {
  return (
    <Container maxWidth="ex" className='fmi_oder_syetem_main'>
      <div className='fmi_order_system_wrap'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/order-list' element={<OrderList />} />
            <Route path='/order-view' element={<Dashboard />} />
            <Route path='order-details' element={<OderDetails />} />
            <Route path='/staging-inventory' element={<SatagingInventory />} />
          </Routes>
        </BrowserRouter>
    </div>
    </Container>
  )
}

export default App
