import React, { useState } from 'react';
import Header from "../../common/Header";
import Orderview from './OrderView';




import Container from 'react-bootstrap/Container';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function Dashboard() {
  const [selectedOrderTab, setselectedOrderTab] = useState('1');

  const orderTabChange = (event, newvalue) => {
    setselectedOrderTab(newvalue);
  };

  return (
    <Container fluid>
        <Header/>
        <TabContext value={selectedOrderTab}>
          <Box>
            <TabList onChange={orderTabChange} aria-label="lab API tabs example">
              <Tab label="Order View" value="1" />
              <Tab label="Order List" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Orderview/>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </Container>
  )
}

export default Dashboard