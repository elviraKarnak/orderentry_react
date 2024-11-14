import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import { ListItemIcon } from "@mui/material";

import { menueDataAdmin } from "../utils/Constant";

//icon
import { SlLogout } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";

const drawerWidth = 240;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`, // Keep the app bar width fixed
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  position: "fixed", // Make the AppBar fixed
  zIndex: theme.zIndex.drawer + 1, // Ensure it stays above the drawer
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Header({ title }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();
    // Redirect to the login screen
    // navigate('/');
    window.location.replace("/");
  };

  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        className="fmi_ordersystem_header"
        position="relative"
        color="transparent"
        open={open}
      >
        <Toolbar>
          <div className="menue_box">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="rounded"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon className="menu_icon" />
            </IconButton>

            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              hidden={open ? true : false}
            >
              Menu
            </Typography> */}


            {/* {(location.pathname === '/' ||
              location.pathname === '/order-entry' ||
              location.pathname === '/order-list' ||
              location.pathname === '/buyer-dashboard' ||
              location.pathname === '/order-details'

            ) && (
                <>
                  <div className="menuitem">
                    <GridViewSharpIcon className='menu_icon' />
                    <Typography variant="h6" noWrap component="div">
                      <Link to="/">Order View</Link>
                    </Typography>
                  </div>
                  <div className="menuitem">
                    <FormatListBulletedSharpIcon className='menu_icon' />
                    <Typography variant="h6" noWrap component="div">
                      <Link to="/buyer-dashboard">Order List</Link>
                    </Typography>
                  </div>
                </>
              )} */}

          </div>
        </Toolbar>
        <div className="d-flex justify-content-center w-100">
          <Typography
            className="fmi_farms_pagetitle title"
            variant="h3"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            {title}
          </Typography>
        </div>
      </AppBar>

      <Drawer
        ref={drawerRef}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        className="fmi_sidebar_menu"
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <RxCross2 /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className="page_navigation sidebar-scroll">
          {menueDataAdmin.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                padding: 0,
                margin: 0,
              }}
            >

              <Link
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <ListItemButton>
                  {" "}
                  <ListItemIcon>{item.icon}</ListItemIcon>{" "}
                  <Typography>{item.menuName}</Typography>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton>
              <Link
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <ListItemIcon>
                  <SlLogout />
                </ListItemIcon>
                <Typography>Logout</Typography>
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default Header;
