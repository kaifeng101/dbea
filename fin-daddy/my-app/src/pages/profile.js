// import React, { useState, useEffect } from "react";
// import { Container, Avatar, Typography, Paper } from '@mui/material';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';

import React from 'react';
import { Box, Typography, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';


const Profile = () => {
  return (
    <Box sx={{ display: 'flex', padding: 3 }}>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5">About</Typography>
            <Typography variant="body1">Phone: (629) 555-0123</Typography>
            <Typography variant="body1">Email: nicholaswatz@gmail.com</Typography>
            <Typography variant="body1">Address: 390 Market Street, Suite 200, San Francisco CA, 94102</Typography>
            <Divider sx={{ margin: '10px 0' }} />
            <Typography variant="h6">Employee details</Typography>
            <Typography variant="body1">Date of Birth: Sep 26, 1988</Typography>
            <Typography variant="body1">National ID: GER105164</Typography>
            <Typography variant="body1">Title: Project Manager</Typography>
            <Typography variant="body1">Hire Date: Jan 05, 2023</Typography>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5">Job Information</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Creative Associate" secondary="Project Management" />
                <ListItemText primary="Alex Foster" secondary="Manager" />
                <ListItemText primary="May 13, 2024" secondary="Hire Date" />
                <ListItemText primary="Metro DC" secondary="Location" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Marketing Team" secondary="Leadership" />
                <ListItemText primary="Jack Daniel" secondary="Manager" />
                <ListItemText primary="Sep 05, 2024" secondary="Hire Date" />
                <ListItemText primary="Bergen, NJ" secondary="Location" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Team Lead" secondary="Creator" />
                <ListItemText primary="Alina Skazka" secondary="Manager" />
                <ListItemText primary="Jun 08, 2023" secondary="Hire Date" />
                <ListItemText primary="Miami, FL" secondary="Location" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Finance & Accounting" secondary="Senior Consultant" />
                <ListItemText primary="John Miller" secondary="Manager" />
                <ListItemText primary="Sep 13, 2023" secondary="Hire Date" />
                <ListItemText primary="Chicago, IL" secondary="Location" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Team Lead" secondary="Creator" />
                <ListItemText primary="Mark Baldwin" secondary="Manager" />
                <ListItemText primary="Jul 07, 2023" secondary="Hire Date" />
                <ListItemText primary="Miami, FL" secondary="Location" />
              </ListItem>
            </List>

            <Typography variant="h5" sx={{ marginTop: 2 }}>Activity</Typography>
            <List>
              <ListItem>
                <ListItemText primary="John Miller last login on Jul 13, 2024" secondary="05:36 PM" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Merva Sahin date created on Sep 08, 2024" secondary="03:12 PM" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Tammy Collier updated on Aug 15, 2023" secondary="05:36 PM" />
              </ListItem>
            </List>

            <Typography variant="h5" sx={{ marginTop: 2 }}>Compensation</Typography>
            <List>
              <ListItem>
                <ListItemText primary="862.00 USD per month" secondary="Effective date on May 10, 2015" />
              </ListItem>
              <ListItem>
                <ListItemText primary="1560.00 USD per quarter" secondary="Effective date on Jun 08, 2022" />
              </ListItem>
              <ListItem>
                <ListItemText primary="378.00 USD per week" secondary="Effective date on Aug 02, 2022" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const getData = async () => {
  //   const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/customer??CustomerID=0000002313&CertificateNo=000002`; // Replace with your endpoint URL
  //   const username = "12173e30ec556fe4a951"; // Replace with your username
  //   const password = "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0"; // Replace with your password

  //   const headers = new Headers();
  //   headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));
  //   headers.set('Content-Type', 'application/json');

  //   try {
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: headers,
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       setData(result);
  //       console.log("Response Data:", result);
  //     } else {
  //       setError(`Error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     setError("Network Error: " + error.message);
  //   } finally {
  //     setLoading(false); // Stop loading regardless of the outcome
  //   }
  // };

  // // Call getData on component mount
  // useEffect(() => {
  //   getData();
  // }, []); // Empty dependency array means this runs once when the component mounts

  // return (
  //   <div style={{ marginTop: "20px" }}>
  //     <Card sx={{ minWidth: 275 }}>
  //       <CardContent>
  //         <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
  //           Word of the Day
  //         </Typography>
  //         <Typography variant="h5" component="div">
  //           be
  //         </Typography>
  //         <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
  //         <Typography variant="body2">
  //           well meaning and kindly.
  //           <br />
  //           {'"a benevolent smile"'}
  //         </Typography>
  //       </CardContent>
  //       <CardActions>
  //         <Button size="small">Learn More</Button>
  //       </CardActions>
  //     </Card>
  //     <Container maxWidth="sm">
  //       <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
  //         <Avatar
  //           sx={{ width: 100, height: 100, margin: 'auto' }}
  //         />
  //         {loading && <Typography variant="body1">Loading...</Typography>}
  //         {error && <Typography variant="body1" color="error">{error}</Typography>}
  //         {data && !loading && (
  //           <>
  //             <Typography variant="h4" gutterBottom>
  //               Name: {data.givenName} {data.familyName}
  //             </Typography>
  //             <Typography variant="subtitle1" color="textSecondary">
  //               Email: {data.profile.email || "Not available"}
  //             </Typography>
  //             <Typography variant="body1" mt={2}>
  //               Bio: {data.profile.gender} {/* Adjust based on your requirements */}
  //             </Typography>
  //             <Typography variant="body2">
  //               Position: {data.employment.positionTitle}
  //             </Typography>
  //             <Typography variant="body2">
  //               Year of Service: {data.employment.yearOfService}
  //             </Typography>
  //             <Typography variant="body2">
  //               Date of Birth: {new Date(data.dateOfBirth).toLocaleDateString()}
  //             </Typography>
  //             <Typography variant="body2">
  //               Address: {data.address.streetAddress1} {data.address.postalCode}
  //             </Typography>
  //           </>
  //         )}
  //         {!data && !loading && (
  //           <Typography variant="body1">
  //             No data available.
  //           </Typography>
  //         )}
  //       </Paper>
  //     </Container>
  //   </div>
  // );
};

export default Profile;
