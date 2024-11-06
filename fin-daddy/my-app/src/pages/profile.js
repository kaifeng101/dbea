import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { Container, Avatar, Typography, Paper, Grid } from '@mui/material';
import Button from "@mui/material/Button";

const Profile = () => {
  const [data, setData] = useState(null);

  const getData = async () => {
    const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/customer??CustomerID=0000002313&CertificateNo=000002`; // Replace with your endpoint URL
    const username = "12173e30ec556fe4a951"; // Replace with your username
    const password = "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0"; // Replace with your password

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    headers.set('Content-Type', 'application/json');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
        console.log("Response Data:", result);
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Avatar
            sx={{ width: 100, height: 100, margin: 'auto' }}
          />
          {data ? (
            <>
              <Typography variant="h4" gutterBottom>
                Name: {data.givenName} {data.familyName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Email: {data.profile.email || "Not available"}
              </Typography>
              <Typography variant="body1" mt={2}>
                Bio: {data.profile.gender} {/* Adjust based on your requirements */}
              </Typography>
              <Typography variant="body2">
                Position: {data.employment.positionTitle}
              </Typography>
              <Typography variant="body2">
                Year of Service: {data.employment.yearOfService}
              </Typography>
              <Typography variant="body2">
                Date of Birth: {new Date(data.dateOfBirth).toLocaleDateString()}
              </Typography>
            </>
          ) : (
            <Typography variant="body1">
              No data available. Please fetch data.
            </Typography>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Profile;
