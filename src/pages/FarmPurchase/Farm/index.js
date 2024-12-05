import React, { useEffect } from 'react'
import Header from '../../../common/Header';
import { Grid, Typography } from '@mui/material';
import FarmOrderList from './component/FarmOrderList';
import { useDispatch } from 'react-redux';
import { commonActions } from '../../../redux/reducers/Common';

function Farm() {

    const dispatch=useDispatch();


    useEffect(()=>{
        dispatch(commonActions.setPageTitle('Farm Purchase Order'))
    },[])

    return (
        <>
            <Grid container>
                <Grid item sm={12}>
                    <Typography variant="h6" className="title">
                        <FarmOrderList />
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default Farm;
