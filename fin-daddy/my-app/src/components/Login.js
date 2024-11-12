import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
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
import { Link, useNavigate } from "react-router-dom";
// import OnBoarding from "../pages/onBoarding";

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
  // const user = useSelector((state) => state.user);
  const navigate = useNavigate();

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
        email: response.data.profile.email,
        custName: response.data.givenName.trim() + " " + response.data.familyName.trim(),
        number: response.data.cellphone.phoneNumber
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
          navigate("/analyticsDashboard");
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container
      maxWidth="sm"
      className="flex justify-center items-center align-middle mt-24"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* {!user && ( */}
        <Box sx={{ width: "100%" }}>
          <div></div>
          <div>
            <div
              className="font-semibold text-xl py-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Customer Login
            </div>
            <div
              className="mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Don't have an account? Register{" "}
              <Link to="/onBoarding" className="text-blue-400 cursor-pointer">
                here
              </Link>
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
              label="Certificate No"
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
                backgroundColor: "#44403c", // Hover background color

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
        {/* )} */}
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
