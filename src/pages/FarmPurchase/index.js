import React from 'react'
import Header from '../../common/Header';
import { Grid, Typography } from '@mui/material';
import FarmOrderList from './component/FarmOrderList';

function FarmPurchase() {
    return (
        <>
            <Grid container>
                <Grid item sm={12}>
                    <Header />
                </Grid>

                <Grid item sm={12}>
                    <Typography variant="h4" className="title">
                        Farm Purchase Order
                    </Typography>
                </Grid>

                <Grid item sm={12}>
                    <Typography variant="h6" className="title">
                        <FarmOrderList />
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default FarmPurchase;
