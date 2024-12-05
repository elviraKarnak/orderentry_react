import React from 'react'
import { useSelector } from 'react-redux';

function NotFound() {

    const { authUser, isAuthenticated } = useSelector(state => state.Auth);


    return (
        <h6>
            !!Page Not Found!!
        </h6>
    )
}

export default NotFound
