import React, { useEffect } from 'react';
import Header from '../../common/Header';
import ProductTable from './ProductTable';
import { useDispatch } from 'react-redux';
import { commonActions } from '../../redux/reducers/Common';


function ProductView() {
    // const queryClient = new QueryClient();
    const dispatch=useDispatch();

    useEffect(()=>{
      dispatch(commonActions.setPageTitle("Product Table"));
    },[])
 
  return (
    <>
        <ProductTable/>
    </>
  )
}

export default ProductView;




