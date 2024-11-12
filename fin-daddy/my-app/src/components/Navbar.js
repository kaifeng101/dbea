import React, { useState } from "react";
import "../index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { selectUser, logout } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const location = useLocation(); // Use this hook to get the current route

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setSnackbarMessage("Successfully Logged Out");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    navigate("/"); // Navigate to login or another page after logout
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{backgroundColor: "#14532d"}}>
      <Toolbar className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Typography variant="h6" className="font-semibold" style={{ fontFamily: 'Montserrat, sans-serif'}} >
            Fin-Daddy
          </Typography>
        </div>
          {user ? ( 
            <>
              <Link className="flex space-x-6" to="/analyticsDashboard">
                <Button style={{ fontFamily: 'Montserrat, sans-serif'}}  color="inherit" sx={{ marginLeft: "8px", color: isActiveLink("/analyticsDashboard") ? "black" : "inherit"}}>Analytics</Button>
              </Link>
              <Button color="inherit" onClick={handleClick} sx={{
                  color: isActiveLink("/transaction") ||
                    isActiveLink("/directDebitPayment") ||
                    isActiveLink("/billPayment")
                    ? "black"
                    : "inherit",
                }} style={{ fontFamily: 'Montserrat, sans-serif'}} >
                Transactions
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem style={{ fontFamily: 'Montserrat, sans-serif'}}  className="flex space-x-6" onClick={() => navigate("/transaction")}>
                  Transaction
                </MenuItem>
                <MenuItem style={{ fontFamily: 'Montserrat, sans-serif'}}  className="flex space-x-6" onClick={() => navigate("/directDebitPayment/viewAll")}>
                  Direct Debit Payment
                </MenuItem>
                <MenuItem style={{ fontFamily: 'Montserrat, sans-serif'}}  className="flex space-x-6" onClick={() => navigate("/billPayment")}>
                  Bill Payment
                </MenuItem>
                <MenuItem style={{ fontFamily: 'Montserrat, sans-serif'}}  className="flex space-x-6" onClick={() => navigate("/transactionHistory")}>
                  History
                </MenuItem>
              </Menu>
              <Link className="flex space-x-6" to="/carbonMarketplace">
                <Button style={{ fontFamily: 'Montserrat, sans-serif'}}  color="inherit" sx={{ marginLeft: "8px", color: isActiveLink("/carbonMarketplace") ? "black" : "inherit" }}>Carbon Marketplace</Button>
              </Link>
              <Link className="flex space-x-6" to="/milesRedemption">
                <Button style={{ fontFamily: 'Montserrat, sans-serif'}}  color="inherit" sx={{ marginLeft: "8px", color: isActiveLink("/milesRedemption") ? "black" : "inherit" }}>Miles</Button>
              </Link>
              <Link className="flex space-x-6" to="/investments">
                <Button style={{ fontFamily: 'Montserrat, sans-serif'}}  color="inherit" sx={{ marginLeft: "8px", color: isActiveLink("/investments") ? "black" : "inherit" }}>Investments</Button>
              </Link>
              <Link className="flex space-x-6" to="/profile">
                <Button style={{ fontFamily: 'Montserrat, sans-serif'}}  color="inherit" sx={{ marginLeft: "8px", color: isActiveLink("/profile") ? "black" : "inherit" }}>Profile</Button>
              </Link>
              <Button
                style={{ fontFamily: 'Montserrat, sans-serif'}} 
                color="inherit"
                sx={{ marginLeft: "8px" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ):(
            <>
              <Link to="/">
                <Button
                  color="inherit"
                  sx={{
                    marginLeft: "8px",
                    color: isActiveLink("/") ? "black" : "inherit",
                  }}
                  style={{ fontFamily: 'Montserrat, sans-serif'}} 
                >
                  Login
                </Button>
              </Link>
            </>
          )}
          
        </Toolbar>
      </AppBar>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NavBar;
