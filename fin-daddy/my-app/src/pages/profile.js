import React, { useState, useEffect } from "react";
import { Container, Avatar, Typography, Grid, Paper, Button } from '@mui/material';
import bankImage from '../assets/bank.gif'; // Import the image

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
    <Container maxWidth="lg" className="my-10">
      <Paper elevation={3} className="p-5 rounded-lg bg-white flex flex-col md:flex-row">
        <div className="md:w-1/3 flex flex-col items-center">
          <Avatar
            alt="Taz Ng"
            src="path/to/your/image.jpg" // Replace with your image path
            sx={{ width: 120, height: 120 }}
          />
          <Typography variant="h5" className="mt-4">{data.givenName} {data.familyName}</Typography>
          <Typography variant="body2">Customer ID: {data.customer.customerId}</Typography>
          <Typography variant="body2">Certificate No: {data.certificate.certificateNo}</Typography>
          <Typography variant="body2">Email: {data.profile.email}</Typography>
          <Typography variant="body2">Birthday: {data.dateOfBirth}</Typography>
          <Typography variant="body2">Gender: {data.profile.gender}</Typography>
          <Typography variant="body2">Mobile Number: {data.cellphone.countryCode} {data.cellphone.phoneNumber}</Typography>
          
        </div>

        <div className="md:w-2/3 md:pl-5">
          <Typography variant="h6" className="font-bold">About</Typography>
          <Typography variant="body2" className="mt-2">
            Co-Founder, CEO and Product Lead of SkillGravity, Startup Advisor. I have been bootstrapping the company of 7 people for 2 years.
            Proudly worked with my trusted resources I managed to envision and launch a revolutionary web and mobile app.
          </Typography>
          <Typography variant="body2" className="mt-4">
            With zero marketing budget, I strategized with the team and successfully acquired our first 1000 active users and made several valuable key partnerships in a few months.
          </Typography>

          <Typography variant="h6" className="font-bold mt-6">Skills</Typography>
          <div className="flex flex-wrap mt-2">
            {["Marketing", "Event Management", "Marketing Communications", "Digital Marketing", "Graphic Design", "Product Management"].map(skill => (
              <Typography key={skill} variant="body2" className="bg-blue-200 rounded-full px-3 py-1 m-1">
                {skill}
              </Typography>
            ))}
          </div>

          <Typography variant="h6" className="font-bold mt-6">Countries of Expertise</Typography>
          <div className="flex flex-wrap mt-2">
            {["United States", "South Africa", "Russia", "United Kingdom", "United Arab Emirates", "Germany"].map(country => (
              <Typography key={country} variant="body2" className="bg-gray-200 rounded-full px-3 py-1 m-1">
                {country}
              </Typography>
            ))}
          </div>

          <Typography variant="h6" className="font-bold mt-6">Languages</Typography>
          <div className="flex flex-wrap mt-2">
            {["English", "Russian"].map(language => (
              <Typography key={language} variant="body2" className="bg-gray-200 rounded-full px-3 py-1 m-1">
                {language}
              </Typography>
            ))}
          </div>

          <Typography variant="h6" className="font-bold mt-6">Attachments</Typography>
          <div className="flex flex-wrap mt-2">
            {["resume.pdf", "portfolio_presentation.ppt", "department_showreel.mov"].map(file => (
              <Typography key={file} variant="body2" className="text-blue-600 underline cursor-pointer m-1">
                {file}
              </Typography>
            ))}
          </div>

          <Typography variant="h6" className="font-bold mt-6">Sectors of Expertise</Typography>
          <div className="flex flex-wrap mt-2">
            {["Internet Services", "E-commerce", "Product Development", "Management", "Startup Advisor", "Human Resources"].map(sector => (
              <Typography key={sector} variant="body2" className="bg-gray-200 rounded-full px-3 py-1 m-1">
                {sector}
              </Typography>
            ))}
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default Profile;
