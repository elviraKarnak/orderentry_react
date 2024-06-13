import React from 'react'
import Header from '../../../common/Header'
import ProductTable from './ProductTable'
import {QueryClient,QueryClientProvider,useQuery} from '@tanstack/react-query';


function ProductView() {
    // const queryClient = new QueryClient();
 
  return (
    <>
        <Header title='Product Table'/>
        <ProductTable/>
    </>
  )
}

export default ProductView




