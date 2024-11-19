import React from 'react';
import { Grid, Typography } from '@mui/material';
import Header from '../../common/Header';
import UserList from './component/UserList';

function UserManagement() {
    return (
        <>
            <Grid container>
                <Grid item sm={12}>
                    <Header />
                </Grid>

                <Grid item sm={12}>
                    <Typography variant="h4" className="title">
                        User Management
                    </Typography>
                </Grid>

                <Grid item sm={12}>
                    <Typography variant="h6" className="title">
                        <UserList />
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default UserManagement;
