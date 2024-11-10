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
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Scrum Daddy
          </Typography>
          {user ? ( 
            <>
              <Button color="inherit" onClick={handleClick} sx={{
                  color: isActiveLink("/transaction") ||
                    isActiveLink("/directDebitPayment") ||
                    isActiveLink("/billPayment")
                    ? "lightblue"
                    : "inherit",
                }}>
                Transactions
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate("/transaction")}>
                  Transaction
                </MenuItem>
                <MenuItem onClick={() => navigate("/directDebitPayment")}>
                  Direct Debit Payment
                </MenuItem>
                <MenuItem onClick={() => navigate("/billPayment")}>
                  Bill Payment
                </MenuItem>
              </Menu>
              <Link to="/analyticsDashboard">
                <Button color="inherit" sx={{ marginLeft: "8px", color: isActiveLink("/analyticsDashboard") ? "lightblue" : "inherit"}}>Analytics</Button>
              </Link>
              <Link to="/carbonMarketplace">
                <Button color="inherit" sx={{ marginLeft: "8px", color: isActiveLink("/carbonMarketplace") ? "lightblue" : "inherit" }}>Carbon Marketplace</Button>
              </Link>
              <Link to="/milesRedemption">
                <Button color="inherit" sx={{ marginLeft: "8px", color: isActiveLink("/milesRedemption") ? "lightblue" : "inherit" }}>Miles</Button>
              </Link>
              <Link to="/investments">
                <Button color="inherit" sx={{ marginLeft: "8px", color: isActiveLink("/investments") ? "lightblue" : "inherit" }}>Investments</Button>
              </Link>
              <Link to="/profile">
                <Button color="inherit" sx={{ marginLeft: "8px", color: isActiveLink("/profile") ? "lightblue" : "inherit" }}>Profile</Button>
              </Link>
              <Button
                color="inherit"
                sx={{ marginLeft: "8px" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ):(
            <>
              <Link to="/onBoarding">
                <Button
                  color="inherit"
                  sx={{
                    marginLeft: "8px",
                    color: isActiveLink("/onBoarding") ? "lightblue" : "inherit",
                  }}
                >
                  Register
                </Button>
              </Link>
              <Link to="/">
                <Button
                  color="inherit"
                  sx={{
                    marginLeft: "8px",
                    color: isActiveLink("/") ? "lightblue" : "inherit",
                  }}
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
