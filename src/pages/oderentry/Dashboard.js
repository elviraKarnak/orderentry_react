import React, { useState } from 'react';
import Header from "../../common/Header";
import OrderView from './OrderView';
import UserLogin from '../auth/UserLogin';


function Dashboard() {
  var loginVal = sessionStorage.getItem('login');
  const [islogin, setIsLogin] = useState(loginVal);

  const setLoginSession = (data) => {
    setIsLogin(data);
};

  // const orderTabChange = (event, newvalue) => {
  //   setselectedOrderTab(newvalue);
  // };

  return (
    <>
    {islogin ?<> <Header/> <OrderView /> </>: <UserLogin 
    getLoginResponse={setLoginSession} />}
    </>
    )
}

export default Dashboard