import React, { useState } from 'react';
import Header from "../../common/Header";
import OrderView from './OrderView';
import UserLogin from '../auth/UserLogin';


function Dashboard() {
  const [islogin, setIsLogin] = useState(true);

  // const orderTabChange = (event, newvalue) => {
  //   setselectedOrderTab(newvalue);
  // };

  return (
    <>
    {islogin ?<> <Header/> <OrderView /> </>: <UserLogin />}
    </>
    )
}

export default Dashboard