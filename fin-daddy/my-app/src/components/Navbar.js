import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../redux/userSlice";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = ({}) => {
  const [isOpen, setIsOpen] = useState(false); // for the hamburger
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);
  let userRole = "";
  let userPosition = "";
  const menuRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const location = useLocation(); // Track route changes

//   const handleOpenClick = (events) => {
//     setAnchorEl1(events.currentTarget);
//   };
//   const handleCloseClick = () => {
//     setAnchorEl1(null);
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   if (user !== null) {
//     userRole = user.role;
//     userPosition = user.position;
//   }

  const navigate = useNavigate();

//   const handleLogout = (e) => {
//     e.preventDefault();
//     dispatch(logout());
//     navigate("/login");
//   };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WEBSITE NAME
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Link to='/transactions'>
            <Button color="inherit">Transactions</Button>
          </Link>
          <Link to='/analyticsDashboard'>
            <Button color="inherit">Analytics</Button>
          </Link>
          <Link to='/carbonMarketplace'>
            <Button color="inherit">Carbon Marketplace</Button>
          </Link>
          <Link to='/milesRedemption'>
            <Button color="inherit">Miles</Button>
          </Link>
          <Link to='/onBoarding'>
            <Button color="inherit">Onboarding</Button>
          </Link>
          <Link to='/investments'>
            <Button color="inherit">Investments</Button>
          </Link>
          <Link to='/profile'>
            <Button color="inherit">Profile</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
