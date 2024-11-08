import React, { useState, useRef } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WEBSITE NAME
          </Typography>
          <Button color="inherit" onClick={handleClick}>
            Transactions
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => navigate("/qrCreditPayment")}>
              QR and Credit Payment
            </MenuItem>
            <MenuItem onClick={() => navigate("/directDebitPayment")}>
              Direct Debit Payment
            </MenuItem>
          </Menu>
          <Link to="/beneficiary">
            <Button color="inherit">Beneficiary</Button>
          </Link>
          <Link to="/analyticsDashboard">
            <Button color="inherit">Analytics</Button>
          </Link>
          <Link to="/carbonMarketplace">
            <Button color="inherit">Carbon Marketplace</Button>
          </Link>
          <Link to="/milesRedemption">
            <Button color="inherit">Miles</Button>
          </Link>
          <Link to="/onBoarding">
            <Button color="inherit">Onboarding</Button>
          </Link>
          <Link to="/investments">
            <Button color="inherit">Investments</Button>
          </Link>
          <Link to="/profile">
            <Button color="inherit">Profile</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
