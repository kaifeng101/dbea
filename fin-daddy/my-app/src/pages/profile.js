import React, { useState, useEffect } from "react";
import { Container, Avatar, Typography, Grid, CardMedia } from '@mui/material';

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    const url = "https://smuedu-dev.outsystemsenterprise.com/gateway/rest/customer??CustomerID=0000002313&CertificateNo=000002"; // Replace with your endpoint URL
    const username = "12173e30ec556fe4a951"; // Replace with your username
    const password = "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0"; // Replace with your password

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    headers.set('Content-Type', 'application/json');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
        console.log("Response Data:", result);
      } else {
        setError("Error: ${response.status} ${response.statusText}");
      }
    } catch (error) {
      setError("Network Error: " + error.message);
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
    }
  };

  // Call getData on component mount
  useEffect(() => {
    getData();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div style={{ marginTop: "20px" }}>
      <Container sx={{
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginTop: '20px',
          position: 'relative'
        }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ borderRight: '1px solid #e0e0e0', padding: 2 }}>
            <Typography variant="h5" gutterBottom>Personal Details</Typography>
            <Avatar sx={{ width: 100, height: 100, margin: 'auto' }} />
            {loading && <Typography variant="body1">Loading...</Typography>}
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            {data && !loading && (
              <>
                <Typography variant="h6" gutterBottom>
                  Name: {data.givenName} {data.familyName}
                </Typography>
                <Typography variant="body1">
                  Customer ID: {data.customer.customerId}
                </Typography>
                <Typography variant="body1">
                  Certificate Number: {data.certificate.certificateNo}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Email: {data.profile.email || "Not available"}
                </Typography>
                <Typography variant="body1" mt={2}>
                  Gender: {data.profile.gender}
                </Typography>
                <Typography variant="body2">
                  Date of Birth: {new Date(data.dateOfBirth).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Address: {data.address.streetAddress1} {data.address.postalCode}
                </Typography>
                <Typography variant="body2">
                  Number: {data.cellphone.countryCode} {data.cellphone.phoneNumber}
                </Typography>
              </>
            )}
            {!data && !loading && (
              <Typography variant="body1">No data available.</Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>Employee Details</Typography>
            {data && !loading && (
              <>
                <img src="../assets/bank.gif"></img>
                <Typography variant="body2">
                  My Employment Position: {data.employment.positionTitle}
                </Typography>
                <Typography variant="body2">
                  Year of Service: {data.employment.yearOfService}
                </Typography>
                <Typography variant="body2">
                  Employer Name: {data.employment.employerName}
                </Typography>
                <Typography variant="body2">
                  Office Phone Number: {data.employment.officeContactNumber}
                </Typography>
                <Typography variant="body2">
                  Registration Date: {data.maintenanceHistory.registrationDate}
                </Typography>
              </>
            )}
            {!data && !loading && (
              <Typography variant="body1">No data available.</Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Profile;