import React,{useState } from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

 function Header() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar className="fmi_ordersystem_header" position="relative" color="transparent" open={open}>
        <Toolbar>
          <div className="menue_box">
          <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="rounded"
              
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon className='menu_icon'/>
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Menu
            </Typography>
          </div>
          <div className="menuitem">
            <GridViewSharpIcon className='menu_icon'/>
            <Typography variant="h6" noWrap component="div">
            <Link to="/order-view">Order View</Link>
          </Typography>
          </div>
          <div className="menuitem">
            <FormatListBulletedSharpIcon className='menu_icon'/>
            <Typography variant="h6" noWrap component="div">
            <Link to="/order-list">Order List</Link>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        className="fmi_sidebar_menu"
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className='page_navigation'>
          {[{menuName:'Dashboard',
             path:'/'
             }, 
            {menuName:'Order Entry',
             path:'/order-entry'
            }, 
            {menuName:'Order View',
            path:'/order-view'
            }, 
            {menuName:'Order List',
            path:'/order-list'
            }, 
            {menuName:'Staging Inventory',
            path:'/staging-inventory'
            }, 
            {menuName:'Admin',
            path:'/'}, 
            {menuName:'Accounting',
            path:'/'}, 
            {menuName:'Logout',
            path:'/'}
            ].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
              <Link to={item.path}>{item.menuName}</Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default Header