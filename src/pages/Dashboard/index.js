import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import OrderView from '../oderview/OrderView';
import FarmPurchase from '../FarmPurchase/Farm';

function Dashboard() {

    const { isAuthenticated, authUser } = useSelector(state => state.Auth);

    useEffect(() => {
        console.log('authUser:', authUser);
    }, [authUser]);
   

    if (authUser.role_id == 4) {
        return (<FarmPurchase />);
    }

    return <OrderView />
}

export default Dashboard
