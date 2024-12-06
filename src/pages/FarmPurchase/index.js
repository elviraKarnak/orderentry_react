import React from 'react'
import { useSelector } from 'react-redux'
import Farm from './Farm';
import Buyer from './Buyer';
import { UserRole } from '../../utils/Constant';

function FarmPurchase() {

    const { authUser } = useSelector((state) => state.Auth);

    if (authUser.role_id == UserRole.FARM) {
        return <Farm/>;
    }

    return <Buyer/>;
}

export default FarmPurchase
