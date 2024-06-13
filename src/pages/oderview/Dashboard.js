import React, { useState, useEffect  } from 'react';
import Header from "../../common/Header";
import OrderView from './OrderView';
import UserLogin from '../auth/UserLogin';
import BuyerOrderList  from '../buyer/BuyerOrderList';
import {MemoryRouter, Route, Routes } from 'react-router-dom';


function Dashboard() {
  var loginVal = sessionStorage.getItem('login') ? sessionStorage.getItem('login') : false;
  var getUserType =  sessionStorage.getItem('user_type') ? sessionStorage.getItem('user_type') : '';

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
        {getUserType ? (
            <>
            {console.log(getUserType)}
                {getUserType === '1' && <OrderView/>}
                {getUserType === '3' && <BuyerOrderList/>}
            </>
        ) : (
            <div>Loading...</div>
        )}
    </>
) : (
    <UserLogin getLoginResponse={setLoginSession} />
)}
    </>
    )
}

export default Dashboard