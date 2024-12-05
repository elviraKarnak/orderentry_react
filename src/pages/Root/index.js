import React, { useState, useEffect } from 'react';
// import OrderView from './OrderView';
// import UserLogin from '../auth/UserLogin';
// import BuyerOrderList from '../buyer/BuyerOrderList';
import { MemoryRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';

import { PageModuleData } from '../../utils/Constant';
import checkMenuPermission from '../../utils/commnFnc/CheckMenuPermission';
import Header from '../../common/Header';
// import FarmPurchase from '../FarmPurchase';

// redux
import { useSelector } from 'react-redux';


function Root() {

    const { pageTitle } = useSelector((state) => state.Common);

    var loginVal = sessionStorage.getItem('login') ? sessionStorage.getItem('login') : false;
    var getUserType = sessionStorage.getItem('role_id') ? sessionStorage.getItem('role_id') : '';
    const permisionData = checkMenuPermission(PageModuleData.orderView);


    const location = useLocation();

    const [islogin, setIsLogin] = useState(loginVal);
    const [userType, setuserType] = useState(getUserType);

    const setLoginSession = (data) => {
        setIsLogin(data);
    };

    // const orderTabChange = (event, newvalue) => {
    //   setselectedOrderTab(newvalue);
    // };

    return (
        <>
            <Container maxWidth="ex" className='fmi_oder_syetem_main'>
                <div className='fmi_order_system_wrap'>
                    <Header title={pageTitle} />
                    <Outlet />
                </div>
            </Container>
        </>
    )
}

export default Root