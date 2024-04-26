import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import loginimage from '../../assests/images/login.png'
import Grid from '@mui/material/Unstable_Grid2';



function UserLogin() {
  return (
    <Container maxWidth="ex">
     <Card sx={{ display: 'flex' }}>
     <Grid   container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
      >
		  <Grid md={6}>
        <CardContent>
         
        </CardContent>
      </Grid>
      <Grid md={6}>
      <CardMedia
        component="img"
        image={loginimage}
        alt="FlowerMarketPlace"
      />
       </Grid>
       </Grid>
    </Card>
    </Container>
  )
}

export default UserLogin