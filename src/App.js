//Dependencies
import React from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import OderDetails from './pages/oderview/OderDetails';
import ProductAdd from './pages/product/ProductAdd';

//css 
import './assests/css/theme.default.css';
import './assests/css/theme.boostrap.min.css'
import './assests/css/custom.css';

// old css
import './assests/css/style_old.css';


//Components
import Header from './common/Header';
import Dashboard from './pages/oderview/Dashboard';
import OrderList from './pages/oderview/OrderList';
import OrderView from './pages/oderview/OrderView';
import SatagingInventory from './pages/staginginvemntoty/SatagingInventory';




//Temp component
import SimpleSearch from './pages/OrderEntry/SimpleSearch';
import NewOrder from './pages/Order/NewOrder';
import { RequireAuth } from './middleware/ReruireAuth';
import Store from './Store';


function App() {
  return (
    <Container maxWidth="ex" className='fmi_oder_syetem_main'>
      <div className='fmi_order_system_wrap'>
      <Store>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/order-list' element={<OrderList />} />
              <Route path='/order-view' element={<Dashboard />} />
              <Route path='/order-entry' element={<SimpleSearch />} />
              <Route path='/order-details' element={<OderDetails />} />
              <Route path='/product-entry' element={<ProductAdd />} />
              <Route path='/new-order' element={<RequireAuth><NewOrder /></RequireAuth>} />
              <Route path='/staging-inventory' element={<SatagingInventory />} />
            </Routes>
          </BrowserRouter>
        </Store>
    </div>
    </Container>
  )
}

export default App
