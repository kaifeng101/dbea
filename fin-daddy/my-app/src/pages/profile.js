import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Avatar,
  Typography,
  Grid,
  Paper,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/system';
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import {
  Person,
  Email,
  Phone,
  Cake,
  Home,
  Work,
  BusinessCenter,
  CalendarToday,
  LocationOn,
} from '@mui/icons-material';


const BackgroundHeader = styled(Box)(({ theme }) => ({
  height: 100,
  background: 'linear-gradient(45deg, #16a34a 30%, #4ade80 90%)',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const AvatarWrapper = styled(Box)(({ theme }) => ({
  marginTop: -theme.spacing(8),
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: `4px solid ${theme.palette.background}`,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
}));

const InfoCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const Profile = () => {
  // const user = useSelector(selectUser);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(selectUser);
  const certNo = user?.certificate

  const getData = useCallback(async () => {
    const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/customer?CertificateNo=${certNo}`;
    const username = "12173e30ec556fe4a951";
    const password = "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0";

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
      } else {
        setError(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError("Network Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [certNo]); // Adding certNo to the dependency array

  useEffect(() => {
    getData();
  }, [getData]); // Now getData is included in the dependency array
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Paper style={{borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'}}>
        <BackgroundHeader style={{marginBottom: "10px"}}>
          <Typography variant="h4" color="white" fontWeight="bold">
            Profile
          </Typography>
        </BackgroundHeader>
        <AvatarWrapper>
          <StyledAvatar
            alt={`${data?.givenName} ${data?.familyName}`}
            src="/placeholder.svg"
          />
        </AvatarWrapper>
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            {data?.givenName} {data?.familyName}
          </Typography>
          <Box display="flex" justifyContent="center" gap={1} mb={4}>
            <Chip
              icon={<Person />}
              label={`ID: ${data?.customer.customerId}`}
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<BusinessCenter />}
              label={`Cert: ${data?.certificate.certificateNo}`}
              color="secondary"
              variant="outlined"
            />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InfoCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <InfoItem icon={<Email />} label="Email" value={data?.profile.email || "Not available"} />
                  <InfoItem icon={<Phone />} label="Phone" value={`${data?.cellphone.countryCode} ${data?.cellphone.phoneNumber}`} />
                  <InfoItem icon={<Cake />} label="Date of Birth" value={new Date(data?.dateOfBirth).toLocaleDateString()} />
                  <InfoItem icon={<Person />} label="Gender" value={data?.profile.gender} />
                  <InfoItem icon={<Home />} label="Address" value={`${data?.address.streetAddress1}, ${data?.address.postalCode}`} />
                  <InfoItem icon={<LocationOn />} label="Country" value="Singapore" />
                </CardContent>
              </InfoCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Employment Details
                  </Typography>
                  <InfoItem icon={<Work />} label="Position" value={data?.employment.positionTitle} />
                  <InfoItem icon={<BusinessCenter />} label="Employer" value={data?.employment.employerName} />
                  <InfoItem icon={<CalendarToday />} label="Years of Service" value={data?.employment.yearOfService} />
                  <InfoItem icon={<Phone />} label="Office Contact" value={data?.employment.officeContactNumber} />
                  <InfoItem icon={<CalendarToday />} label="Registration Date" value={data?.maintenanceHistory.registrationDate} />
                </CardContent>
              </InfoCard>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <Box display="flex" alignItems="center" mb={2}>
    <Box mr={2} color="text.secondary">
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">
        {value}
      </Typography>
    </Box>
  </Box>
);

export default Profile;