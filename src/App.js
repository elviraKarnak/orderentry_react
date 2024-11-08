//Dependencies
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import OderDetails from './pages/oderview/OderDetails';
import ProductView from './pages/product/ProductView';
import BuyerOrderList from './pages/buyer/BuyerOrderList';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

//css 
import './assests/css/theme.default.css';
import './assests/css/theme.boostrap.min.css'
import './assests/css/custom.css';

// old css
import './assests/css/style_old.css';

//Components
import Dashboard from './pages/oderview/Dashboard';
//import SatagingInventory from './pages/staginginvemntoty/SatagingInventory_55';
import SatagingInventory from './pages/staginginvemntoty/SatagingInventory';

//Temp component
// import SimpleSearch from './pages/OrderEntry/SimpleSearch';
import SimpleSearchNew from './pages/OrderEntry/SimpleSearchNew';
import NewOrder from './pages/Order/NewOrder';
import { RequireAuth } from './middleware/ReruireAuth';
import Store from './Store';

import OrderListto from './pages/oderview/OrderList2';


const queryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: {
    staleTime: 10000, // refresh every 10 sec
  },
})

function App() {
  const queryClient = new QueryClient();
  return (
    // Create react-query client
    <QueryClientProvider client={queryClient}>
      <Store>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard />} >
              <Route index element={<Dashboard />} />
              <Route path='order-entry' element={<SimpleSearchNew />} />
              <Route path='order-details' element={<OderDetails />} />
              <Route path='order-list_new' element={<OrderListto />} />
              <Route path='product-view' element={<ProductView />} />
              <Route path='new-order' element={<RequireAuth><NewOrder /></RequireAuth>} />
              <Route path='staging-inventory' element={<SatagingInventory />} />
              <Route path='buyer-dashboard' element={<BuyerOrderList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Store>
    </QueryClientProvider>
  )
}

export default App