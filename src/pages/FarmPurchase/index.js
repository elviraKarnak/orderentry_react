import React from 'react'
import Header from '../../common/Header';
import { Typography } from '@mui/material';

function FarmPurchase() {
    return (
        <>
            <Header title='Order Details' />
            <div><Typography variant="h3" className="title">Farm Purchase Order</Typography></div>
            <div className="data_table-head">
                <div className="container-fluid">
                    {/* <div className="view_order_table"><MaterialReactTable table={table} /></div> */}
                </div>
            </div>
        </>
    )
}

export default FarmPurchase;
