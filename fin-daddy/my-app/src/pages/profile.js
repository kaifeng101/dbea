import React, { useState, useEffect } from "react";
import { Container, Avatar, Typography, Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        headers: headers,
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
        console.log("Response Data:", result);
      } else {
        setError(`Error: ${response.status} ${response.statusText}`);
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
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            be
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Avatar
            sx={{ width: 100, height: 100, margin: 'auto' }}
          />
          {loading && <Typography variant="body1">Loading...</Typography>}
          {error && <Typography variant="body1" color="error">{error}</Typography>}
          {data && !loading && (
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
              <Typography variant="body2">
                Address: {data.address.streetAddress1} {data.address.postalCode}
              </Typography>
            </>
          )}
          {!data && !loading && (
            <Typography variant="body1">
              No data available.
            </Typography>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Profile;
