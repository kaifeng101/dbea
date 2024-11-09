import React, { useState, useEffect } from "react";
import { Container, Avatar, Typography, Grid, Paper } from '@mui/material';
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

const Profile = () => {
  const user = useSelector(selectUser)
  console.log(user)

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
      <Container maxWidth="lg" className="my-10">
      <Paper elevation={3} className="p-5 rounded-lg bg-white flex flex-col md:flex-row">
        <div className="md:w-1/3 flex flex-col items-center">
          <Avatar
            alt="Taz Ng"
            src="path/to/your/image.jpg" // Replace with your image path
            sx={{ width: 120, height: 120 }}
          />
          <Typography variant="h5" className="mt-4">Full Name: {data?.givenName}  {data?.familyName}</Typography>
          <Typography variant="subtitle1" className="text-gray-500">Customer ID: {data?.customer.customerId}</Typography>
          <Typography variant="subtitle1" className="text-gray-500">Certificate Number: {data?.certificate.certificateNo}</Typography>
          <Typography variant="body2" className="mt-2">Country: Singapore</Typography>
          <Typography variant="body2">Number: {data?.cellphone.countryCode} {data?.cellphone.phoneNumber}</Typography>
          <Typography variant="body2">Email: {data?.profile.email || "Not available"}</Typography>
          <Typography variant="body2">Date of Birth: {new Date(data?.dateOfBirth).toLocaleDateString()}</Typography>
          <Typography variant="body2">Gender: {data?.profile.gender}</Typography>
          <Typography variant="body2">Address: {data?.address.streetAddress1} {data?.address.postalCode}</Typography>
        </div>

        <div className="md:w-2/3 md:pl-5 mt-5">
          <Typography variant="h6" className="font-bold">Employment Details</Typography>
          <Typography variant="h6" className="font-bold mt-6"></Typography>
          <div>
              <Typography>Position Title: </Typography>
              <Typography variant="body2" className="bg-blue-200 rounded-full px-3 py-1 m-1">
                {data?.employment.positionTitle}
              </Typography>
              <Typography>Year Of Service: </Typography>
              <Typography variant="body2" className="bg-blue-200 rounded-full px-3 py-1 m-1">
                {data?.employment.yearOfService}
              </Typography>
              <Typography>Employer Name: </Typography>
              <Typography variant="body2" className="bg-blue-200 rounded-full px-3 py-1 m-1">
              {data?.employment.employerName}
              </Typography>
              <Typography>Employer Address: </Typography>
              <Typography variant="body2" className="bg-blue-200 rounded-full px-3 py-1 m-1">
              {data?.employment.officeContactNumber}
              </Typography>
              <Typography>Registration Date: </Typography>
              <Typography variant="body2" className="bg-blue-200 rounded-full px-3 py-1 m-1">
              {data?.maintenanceHistory.registrationDate}
              </Typography>
          </div>
          </div>
      </Paper>
    </Container>
    </div>

    
  );
};

export default Profile;