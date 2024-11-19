import React, { useState, useEffect } from 'react';
import Header from "../../common/Header";
import OrderView from './OrderView';
import UserLogin from '../auth/UserLogin';
import BuyerOrderList from '../buyer/BuyerOrderList';
import { MemoryRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';

import { PageModuleData } from '../../utils/Constant';
import checkMenuPermission from '../../utils/commnFnc/CheckMenuPermission';
import FarmPurchase from '../FarmPurchase';


function Dashboard() {
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
            {islogin ? (
                <>
                    <Container maxWidth="ex" className='fmi_oder_syetem_main'>
                        <div className='fmi_order_system_wrap'>
                            {getUserType && (location.pathname === '/') ? (
                                <>
                                    {/* {console.log(getUserType)}
                                    {getUserType === '1' && <OrderView />}
                                    {getUserType === '3' && <BuyerOrderList />} */}

                                    {console.log(getUserType)}
                                    {['1','2','3'].includes(getUserType) && <OrderView />}
                                    {['4'].includes(getUserType) && <FarmPurchase />}
                                    
                                    
                                </>
                            ) : (
                                <Outlet />
                            )}
                        </div>
                    </Container>
                </>
            ) : (
                <UserLogin getLoginResponse={setLoginSession} />
            )}
        </>
    )
}

export default Dashboard