import React from 'react'
import { useSelector } from 'react-redux'
import Farm from './Farm';
import Buyer from './Buyer';

function FarmPurchase() {

    const { authUser } = useSelector((state) => state.Auth);

    if (authUser.role_id == 4) {
        return <Farm/>;
    }

    return <Buyer/>;
}

export default FarmPurchase
