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
} from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import {
  Person,
  Email,
  Phone,
  Cake,
  AttachMoney,
  CurrencyExchange,
  AccessTime,
  TrendingUp,
  EventAvailable,
  AccountBox,
  LocalOffer,
  SupervisedUserCircle,
  Home,
  Work,
  BusinessCenter,
  CalendarToday,
  AccountBalance,
  AccountCircle,
  LocationOn,
} from "@mui/icons-material";
import axios from "axios";

const BackgroundHeader = styled(Box)(({ theme }) => ({
  height: 100,
  background: "linear-gradient(45deg, #16a34a 30%, #4ade80 90%)",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const AvatarWrapper = styled(Box)(({ theme }) => ({
  marginTop: -theme.spacing(8),
  marginBottom: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: `4px solid ${theme.palette.background}`,
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
}));

const InfoCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
  },
}));

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const user = useSelector(selectUser);
  const certNo = user?.certificate;

  const getAccounts = useCallback(async () => {
    try {
      const getAccountsId = `https://personal-svyrscxo.outsystemscloud.com/AccountRegistration/rest/AccountType/GetAccountType?customerId=${user.customerId}`;
      const response1 = await axios.get(getAccountsId, {
        headers: {
          "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d", // API Key
        },
      });

      // Handle case where response is empty or malformed
      if (!response1.data) {
        console.error("Error: No data returned from GetAccountType API.");
        return;
      }

      const { accountId: depositId, savingaccountId: savingsId } =
        response1.data;

      // Handle missing IDs
      if (!depositId || !savingsId) {
        console.error("Error: Missing account IDs in response.");
        return;
      }

      const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/customer/${user.customerId}/accounts`;
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

      // Ensure accounts are found
      const depositAccount = response.data.find(
        (account) => account?.accountId === depositId
      );
      const savingsAccount = response.data.find(
        (account) => account?.accountId === savingsId
      );

      if (!depositAccount || !savingsAccount) {
        console.error("Error: One or more accounts not found.");
        return;
      }

      setAccounts([depositAccount, savingsAccount]);
    } catch (error) {
      console.error("Error fetching customer accounts: ", error);
    }
  }, [user.customerId]);

  const getData = useCallback(async () => {
    const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/customer?CertificateNo=${certNo}`;
    const username = "12173e30ec556fe4a951";
    const password =
      "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0";

    const headers = new Headers();
    headers.set("Authorization", "Basic " + btoa(`${username}:${password}`));
    headers.set("Content-Type", "application/json");

    try {
      const response = await fetch(url, {
        method: "GET",
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
    getAccounts();
  }, [getData, getAccounts]); // Now getData is included in the dependency array

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
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
      <Paper
        style={{
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <BackgroundHeader style={{ marginBottom: "10px" }}>
          <Typography
            variant="h4"
            color="white"
            fontWeight="bold"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
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
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {data?.givenName} {data?.familyName}
          </Typography>
          <Box display="flex" justifyContent="center" gap={1} mb={4}>
            <Chip
              icon={<Person />}
              label={`ID: ${data?.customer.customerId}`}
              color="primary"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              variant="outlined"
            />
            <Chip
              icon={<BusinessCenter />}
              label={`Cert: ${data?.certificate.certificateNo}`}
              color="secondary"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              variant="outlined"
            />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InfoCard style={{ fontFamily: "Montserrat, sans-serif" }}>
                <CardContent
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  variant="outlined"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Personal Information
                  </Typography>
                  <InfoItem
                    icon={<Email />}
                    label="Email"
                    value={data?.profile.email || "Not available"}
                  />
                  <InfoItem
                    icon={<Phone />}
                    label="Phone"
                    value={`${data?.cellphone.countryCode} ${data?.cellphone.phoneNumber}`}
                  />
                  <InfoItem
                    icon={<Cake />}
                    label="Date of Birth"
                    value={new Date(data?.dateOfBirth).toLocaleDateString()}
                  />
                  <InfoItem
                    icon={<Person />}
                    label="Gender"
                    value={data?.profile.gender}
                  />
                  <InfoItem
                    icon={<Home />}
                    label="Address"
                    value={`${data?.address.streetAddress1}, ${data?.address.postalCode}`}
                  />
                  <InfoItem
                    icon={<LocationOn />}
                    label="Country"
                    value="Singapore"
                  />
                </CardContent>
              </InfoCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoCard
                style={{ fontFamily: "Montserrat, sans-serif" }}
                variant="outlined"
              >
                <CardContent style={{ fontFamily: "Montserrat, sans-serif" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Employment Details
                  </Typography>
                  <InfoItem
                    icon={<Work />}
                    label="Position"
                    value={data?.employment.positionTitle}
                  />
                  <InfoItem
                    icon={<BusinessCenter />}
                    label="Employer"
                    value={data?.employment.employerName}
                  />
                  <InfoItem
                    icon={<CalendarToday />}
                    label="Years of Service"
                    value={data?.employment.yearOfService}
                  />
                  <InfoItem
                    icon={<Phone />}
                    label="Office Contact"
                    value={data?.employment.officeContactNumber}
                  />
                  <InfoItem
                    icon={<CalendarToday />}
                    label="Registration Date"
                    value={data?.maintenanceHistory.registrationDate}
                  />
                </CardContent>
              </InfoCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoCard style={{ fontFamily: "Montserrat, sans-serif" }}>
                <CardContent
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  variant="outlined"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Deposit Account Information
                  </Typography>

                  <InfoItem
                    icon={<AccountCircle />}
                    label="Account ID"
                    value={accounts[0]?.accountId || "Not Available"}
                  />
                  <InfoItem
                    icon={<AccountBalance />}
                    label="Account Balance"
                    value={`$${accounts[0]?.balance || "Not Available"}`}
                  />
                  <InfoItem
                    icon={<CalendarToday />} // Use any suitable icon for dates
                    label="Account Open Date"
                    value={accounts[0]?.accountOpenDate || "Not Available"}
                  />
                  <InfoItem
                    icon={<AttachMoney />} // Represents asset value
                    label="Asset Value"
                    value={`$${accounts[0]?.assetValue || "Not Available"}`}
                  />
                  <InfoItem
                    icon={<CurrencyExchange />} // Represents currency type
                    label="Currency"
                    value={accounts[0]?.currency || "Not Available"}
                  />
                  <InfoItem
                    icon={<AccessTime />} // Represents current status
                    label="Current Status"
                    value={accounts[0]?.currentStatus || "Not Available"}
                  />
                  <InfoItem
                    icon={<TrendingUp />} // Represents interest rate
                    label="Interest Rate"
                    value={`${
                      accounts[0]?.interestRate * 100 || "Not Available"
                    }%`}
                  />
                  <InfoItem
                    icon={<EventAvailable />} // Represents loan term
                    label="Loan Term"
                    value={accounts[0]?.loanTerm || "Not Available"}
                  />
                  <InfoItem
                    icon={<CalendarToday />} // Use another calendar icon for maturity date
                    label="Maturity Date"
                    value={accounts[0]?.maturityDate || "Not Available"}
                  />
                  <InfoItem
                    icon={<SupervisedUserCircle />} // Represents parent account flag
                    label="Parent Account Flag"
                    value={accounts[0]?.parentAccountFlag ? "Yes" : "No"}
                  />
                  <InfoItem
                    icon={<AccountBox />} // Represents product ID
                    label="Product ID"
                    value={accounts[0]?.productId || "Not Available"}
                  />
                  <InfoItem
                    icon={<LocalOffer />} // Represents product name
                    label="Product Name"
                    value={accounts[0]?.productName || "Not Available"}
                  />
                </CardContent>
              </InfoCard>
            </Grid>

            {/* Savings Account */}
            <Grid item xs={12} md={6}>
              <InfoCard style={{ fontFamily: "Montserrat, sans-serif" }}>
                <CardContent
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  variant="outlined"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Savings Account Information
                  </Typography>

                  <InfoItem
                    icon={<AccountCircle />}
                    label="Account ID"
                    value={accounts[1]?.accountId || "Not Available"}
                  />
                  <InfoItem
                    icon={<AccountBalance />}
                    label="Account Balance"
                    value={`$${accounts[1]?.balance || "Not Available"}`}
                  />
                  <InfoItem
                    icon={<CalendarToday />} // Use any suitable icon for dates
                    label="Account Open Date"
                    value={accounts[1]?.accountOpenDate || "Not Available"}
                  />
                  <InfoItem
                    icon={<AttachMoney />} // Represents asset value
                    label="Asset Value"
                    value={`$${accounts[1]?.assetValue || "Not Available"}`}
                  />
                  <InfoItem
                    icon={<CurrencyExchange />} // Represents currency type
                    label="Currency"
                    value={accounts[1]?.currency || "Not Available"}
                  />
                  <InfoItem
                    icon={<AccessTime />} // Represents current status
                    label="Current Status"
                    value={accounts[1]?.currentStatus || "Not Available"}
                  />
                  <InfoItem
                    icon={<TrendingUp />} // Represents interest rate
                    label="Interest Rate"
                    value={`${
                      accounts[1]?.interestRate * 100 || "Not Available"
                    }%`}
                  />
                  <InfoItem
                    icon={<EventAvailable />} // Represents loan term
                    label="Loan Term"
                    value={accounts[1]?.loanTerm || "Not Available"}
                  />
                  <InfoItem
                    icon={<CalendarToday />} // Use another calendar icon for maturity date
                    label="Maturity Date"
                    value={accounts[1]?.maturityDate || "Not Available"}
                  />
                  <InfoItem
                    icon={<SupervisedUserCircle />} // Represents parent account flag
                    label="Parent Account Flag"
                    value={accounts[1]?.parentAccountFlag ? "Yes" : "No"}
                  />
                  <InfoItem
                    icon={<AccountBox />} // Represents product ID
                    label="Product ID"
                    value={accounts[1]?.productId || "Not Available"}
                  />
                  <InfoItem
                    icon={<LocalOffer />} // Represents product name
                    label="Product Name"
                    value={accounts[1]?.productName || "Not Available"}
                  />
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
      <Typography
        variant="body2"
        color="text.secondary"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {value}
      </Typography>
    </Box>
  </Box>
);

export default Profile;
