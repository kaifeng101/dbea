import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/userSlice";
import {
  TextField,
  Button,
  Container,
  Box,
  Alert,
  Slide,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const LoginComponent = () => {
  const [certificateNo, setCertificateNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const fetchCustomer = async (certificateNo) => {
    try {
      const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/customer?CertificateNo=${certificateNo}`;
      const username = "12173e30ec556fe4a951";
      const password =
        "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0";

      const basicAuth = "Basic " + btoa(`${username}:${password}`);

      const response = await axios.get(url, {
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
      });
      console.log("Customer: ", response.data);
      const customerInfo = {
        certificate: response.data.certificate.certificateNo,
        customerId: response.data.customer.customerId,
        bankId: response.data.profile.BankId,
      };
      return customerInfo;
    } catch (error) {
      console.error("Error fetching customer: ", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!certificateNo) {
      setError("Please enter a certificate number.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      const foundUser = await fetchCustomer(certificateNo);

      if (foundUser) {
        if (password === certificateNo) {
          const userInfo = foundUser;
          console.log(foundUser);
          setSnackbarMessage("Successfully Logged In");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          dispatch(login(userInfo));
          setError("");
          setCertificateNo("");
          setPassword("");
        } else {
          setError("Invalid Password. Please try again.");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setSnackbarMessage("Successfully Logged Out");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container
      maxWidth="sm"
      className="flex justify-center pt-10 items-center align-middle"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {user.isLoggedIn ? (
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ width: "100%" }}>
            <div></div>
            <div>
              <div className="font-semibold text-xl py-2">Customer Login</div>
              <div>
                Don't have an account? Register{" "}
                {/* <Link to="/register" className="text-blue-400 cursor-pointer"> */}
                here
                {/* </Link> */}
              </div>
            </div>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Staff ID"
                variant="outlined"
                value={certificateNo}
                onChange={(e) => setCertificateNo(e.target.value)}
                placeholder="Enter your Certificate Number"
                sx={{
                  mb: 2,
                  "& .MuiFormLabel-root": {
                    fontFamily: "'Montserrat', sans-serif",
                  },
                  "& .MuiInputBase-root": {
                    fontFamily: "'Montserrat', sans-serif",
                  },
                }}
                type="number"
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                sx={{
                  mb: 2,
                  "& .MuiFormLabel-root": {
                    fontFamily: "'Montserrat', sans-serif",
                  },
                  "& .MuiInputBase-root": {
                    fontFamily: "'Montserrat', sans-serif",
                  },
                }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                type="submit"
                sx={{
                  borderRadius: "12px",
                  color: "#fff", // Text color
                  borderColor: "#6fb3e5", // Border color (outline color)
                  backgroundColor: "#6fb3e5", // Hover background color
                  "&:hover": {
                    backgroundColor: "#d1d5db", // Hover background color
                    borderColor: "#d1d5db",
                  },
                  "& .MuiFormLabel-root": {
                    fontFamily: "'Montserrat', sans-serif",
                  },
                  "& .MuiInputBase-root": {
                    fontFamily: "'Montserrat', sans-serif",
                  },
                }}
              >
                Login
              </Button>
            </form>
          </Box>
        )}
      </Box>
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
    </Container>
  );
};

export default LoginComponent;
