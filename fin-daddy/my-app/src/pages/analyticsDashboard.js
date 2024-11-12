import React, {useEffect, useState, useCallback} from "react";
import axios from 'axios';
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Grid, Alert, Slide, Snackbar} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const Analytics = () => {
  const [carbonTypeData, setCarbonTypeData] = useState([]);
  const [monthlyCarbon, setMonthlyCarbon] = useState([]);
  const [currentMiles, setCurrentMiles] = useState(0);
  const [carbonKG, setCarbonKG] = useState(0);
  const [carbonCredits, setCarbonCredits] = useState(0);
  const [accountID, setAccountID] = useState(null);
  const [spending, setSpending] = useState(0);
  const [savings, setSavings] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const apiKey = 'c48b5803-757e-414d-9106-62ab010a9c8d';
  const user = useSelector(selectUser);
  const userID = user?.customerId
  const userName = user?.custName
  const emailAddress = user?.email
  const [transactionsData, setTransactionsData] = useState([]);
  const [milesData, setMilesData] = useState([]);
  const [investmentsData, setInvestmentsData] = useState([]);
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState("");

  const [tabValue, setTabValue] = useState(0); // Track which tab is selected
  const tabs = [
    { id: 0, label: "Transactions & Miles" },
    { id: 1, label: "Carbon Analysis" }, 
    { id: 2, label: "Investments" }
  ];

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");


  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue); // Change active tab
  };

  const getCarbonData = useCallback(async () => {
    const url = `https://personal-svyrscxo.outsystemscloud.com/CustomerCarbon/rest/CarbonTransaction/GetCarbonTransactions?CustomerId=${userID}`; // Replace with your endpoint URL
    
    try {
      const response = await axios.get(url, {
        headers: {
          'X-Contacts-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const data = response.data;

        const carbonTotals = data.reduce(
          (acc, item) => {
            if (item.CarbonType === 1) {
              acc.emitted += parseFloat(item.Value);
            } else if (item.CarbonType === 2) {
              acc.credits += parseFloat(item.Value);
            }
            return acc;
          },
          { emitted: 0, credits: 0 }
        );

        setCarbonCredits(carbonTotals.credits.toFixed(2))
        setCarbonKG(carbonTotals.emitted.toFixed(2))

        const carbonTypeTotals = data.reduce((acc, item) => {
          const carbonTypeKey = `Type ${item.CarbonType}`;
          acc[carbonTypeKey] = (acc[carbonTypeKey] || 0) + parseFloat(item.Value);
          return acc;
        }, {});

        const carbonTypeArray = Object.keys(carbonTypeTotals).map(key => {
          // Determine the label based on the type
          const label = key === 'Type 1' ? 'Carbon Emitted' : 'Carbon Credits Earned';
      
          return {
            name: label,
            value: parseFloat(carbonTypeTotals[key].toFixed(1))
          };
        });
  
        setCarbonTypeData(carbonTypeArray);
        
        const monthlyTotals = data.reduce((acc, item) => {
          const month = new Date(item.CreatedAt).toLocaleString('default', { month: 'short' });
          acc[month] = acc[month] || { type1: 0, type2: 0 };
  
          if (item.CarbonType === 1) {
            acc[month].type1 += parseFloat(item.Value);
          } else if (item.CarbonType === 2) {
            acc[month].type2 += parseFloat(item.Value);
          }
  
          return acc;
        }, {});
  
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyCarbonArray = months.map(month => ({
          month,
          type1: parseFloat((monthlyTotals[month]?.type1 || 0).toFixed(1)),
          type2: parseFloat((monthlyTotals[month]?.type2 || 0).toFixed(1))
        }));
  
        setMonthlyCarbon(monthlyCarbonArray);

      }
    } catch (error) {
      console.log("Error")
    } 
  }, [userID, apiKey]);

  const getCurrentMiles = useCallback(async () => {
    const url = `https://personal-lykkncb1.outsystemscloud.com/MilesCRUD/rest/CustMiles/GetMiles?CustomerId=${userID}`;
    
    try {
      const response = await axios.get(url, {
        headers: {
          'X-Contacts-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });
      setCurrentMiles(response.data[0].MilesAmount)
    }
    catch (error) {
      console.log("Error")
    } 
  }, [userID, apiKey]);

  const getAccounts = useCallback(async () => {
    const url = `https://personal-svyrscxo.outsystemscloud.com/AccountRegistration/rest/AccountType/GetAccountType?customerId=${userID}`

    try {
      const response = await axios.get(url, {
        headers: {
          'X-Contacts-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      setAccountID(data.savingaccountId)
    }
    catch (error) {
      console.log("Error")
    } 


  }, [userID, apiKey]);

  const getSpending = useCallback(async () => {
    const url = `https://personal-g2wuuy52.outsystemscloud.com/TransactionRoundUp/rest/PaymentToMerchant/GetPayments?CustomerId=${userID}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'X-Contacts-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      setTransactions(data.length)
      const totalSpending = data.reduce((acc, item) => acc + parseFloat(item.Transaction_Amount), 0);
      setSpending(totalSpending.toFixed(2));

      const monthlyData = data.reduce((acc, item) => {
        const month = new Date(item.Created_At).toLocaleString('default', { month: 'short' });
        if (!acc[month]) {
          acc[month] = { name: month, spending: 0, saving: 0 }; // Assuming saving is to be calculated or provided separately
        }
        acc[month].spending += parseFloat(item.Transaction_Amount);
        acc[month].saving += parseFloat(item.Rounded_Amount) - parseFloat(item.Transaction_Amount);

        return acc;
      }, {});

      const formattedData = Object.values(monthlyData).map(monthData => ({
        ...monthData,
        spending: monthData.spending.toFixed(2),
      }));

      setTransactionsData(formattedData)

      data.forEach(item => {
        item.Transaction_Count = 1;
      });

      const monthlyDataSecond = data.reduce((acc, item) => {
        const month = new Date(item.Created_At).toLocaleString('default', { month: 'short' });

        if (!acc[month]) {
          acc[month] = { month, transactions: 0, miles: 0 };
        }

        acc[month].transactions += 1; // Increment transaction count
        acc[month].miles += parseFloat(item.Miles_Convert); // Sum miles

        return acc;
      }, {});

      const formattedSecondData = Object.values(monthlyDataSecond).map(monthData => ({
        ...monthData,
        miles: parseFloat(monthData.miles).toFixed(2),
      }));

      setMilesData(formattedSecondData)
      
    }
    catch (error) {
      console.log("Error")
    } 
  },[userID, apiKey])

  const getSaving = useCallback(async () => {
    if(accountID){
      const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/account/${userID}/${accountID}/balance`;
      try {
        const username = "12173e30ec556fe4a951";
        const password =
          "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0";

        const basicAuth = "Basic " + btoa(`${username}:${password}`);
        const response = await axios.get(url, {
          headers: {
            Authorization: basicAuth,
            'Content-Type': 'application/json',
          },
        });
  
        const data = response.data.balance;
        setSavings(data.toFixed(2));
      }
      catch (error) {
        console.log("Error")
      } 
    }
    
  },[userID, accountID])

  const getInvestments = useCallback(async () => {
    const url = `https://personal-elwlcep1.outsystemscloud.com/Investment/rest/Investment/GetInvestments?CustomerId=${userID}`
    try {
      const response = await axios.get(url, {
        headers: {
          'X-Contacts-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      const investmentTotals = data.reduce((acc, item) => {
        const investmentType = item.Type;

        if (!acc[investmentType]) {
          acc[investmentType] = 0;
        }

        acc[investmentType] += parseFloat(item.Amount);
        return acc;
      }, {});

      const investmentDistribution = Object.keys(investmentTotals).map(type => {
        let name;
        if (type === 'Green Bonds') {
          name = 'Basic Plan - Green Bonds';
        } else if (type === 'Green Investment Bundle') {
          name = 'Intermediate Plan - Green Investment Bundle';
        } else if (type === 'Leverage Green Growth Package') {
          name = 'Expert Plan - Leveraged Green Growth Package';
        } else {
          name = type; // Default to the type name if not predefined
        }

        return {
          name,
          value: investmentTotals[type],
        };
      });

      
      setInvestmentsData(investmentDistribution);
      
    }
    catch (error) {
      console.log("Error")
    } 


  }, [userID, apiKey]);

  const handleDropdownChange = (event) => {
    const monthIndex = monthsDropdown.indexOf(event.target.value) + 1;
    setSelectedMonth(monthIndex);
  };

  const handleButtonClick = async () => {
    if (!selectedMonth) {
      setSnackbarMessage("Please select a month.");
      setSnackbarSeverity("error"); // Use "error" for failed submission
      setOpenSnackbar(true);
      return;
    }

    const url = `https://personal-grrpique.outsystemscloud.com/NotificationToCompany/rest/SendEmailToCust/getEmailContent?CustomerId=${userID}&CustName=${userName}&Email=${emailAddress}&Month=${selectedMonth}`

    try {
      const response = await axios.get(url, {
        headers: {
          'X-Contacts-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });

      if(response){
        setSelectedMonth(null)
        setSnackbarMessage("Email Sent Successfully ");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      }
    }
    catch (error) {
      console.log("Error")
    } 
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };


  useEffect(() => {
    getCarbonData();
    getCurrentMiles();
    getAccounts()
    getSpending()
    getSaving()
    getInvestments()
  }, [getCarbonData, getCurrentMiles, getAccounts, getSpending, getSaving, getInvestments]);

  const COLORS = {
    green: '#22c55e',
    red: '#ef4444',
    orange: '#f97316',
    blue: '#3b82f6',
  }

  const summaryData = [
    { title: 'Transactions made', value: transactions, color: '#3b82f6' },
    { title: 'Total Spending', value: `$${spending}`, color: '#ef4444' },
    { title: 'Savings Account', value: `$${savings}`, color: '#22c55e' },
    { title: 'Miles Earned', value: currentMiles, color: '#f97316' },
    { title: 'Carbon Footprint', value: carbonKG, color: '#f97316' },
    { title: 'Carbon Credits', value: carbonCredits, color: '#f97316' }
  ];

  const BUNDLE_COLORS = {
    'Basic Plan - Green Bonds': '#0088FE',
    'Intermediate Plan - Green Investment Bundle': '#00C49F',
    'Leveraged Green Growth Package': '#FFBB28',
  };

  const monthsDropdown = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="m-10 mt-24">
      <Grid container spacing={4} style={{ marginBottom: '20px' }}>
        {summaryData.slice(0,3).map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', fontFamily: "Montserrat, sans-serif", minHeight: "100%", minwidth: "100%"}}>
              <CardContent>
                <Typography variant="subtitle1" component="div" style={{ color: '#555', marginBottom: '5px', fontFamily: "Montserrat, sans-serif" }}>
                  {item.title}
                </Typography>
                <Typography variant="h5" component="div" style={{ fontWeight: 'bold', color: '#333', fontFamily: "Montserrat, sans-serif" }}>
                  {item.value}
                </Typography>
                {(item.title === 'Carbon Footprint' || item.title === 'Carbon Credits') && (
                  <Typography variant="body2" component="div" style={{ color: '#777', marginTop: '5px', fontFamily: "Montserrat, sans-serif" }}>
                    {item.title === 'Carbon Footprint'
                      ? 'kg CO2e emitted'
                      : 'earned from sustainable transactions'}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
        {summaryData.slice(3,6).map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', fontFamily: "Montserrat, sans-serif", minHeight: "100%", minwidth: "100%"}}>
              <CardContent>
                <Typography variant="subtitle1" component="div" style={{ color: '#555', marginBottom: '5px', fontFamily: "Montserrat, sans-serif" }}>
                  {item.title}
                </Typography>
                <Typography variant="h5" component="div" style={{ fontWeight: 'bold', color: '#333', fontFamily: "Montserrat, sans-serif" }}>
                  {item.value}
                </Typography>
                {(item.title === 'Carbon Footprint' || item.title === 'Carbon Credits') && (
                  <Typography variant="body2" component="div" style={{ color: '#777', marginTop: '5px', fontFamily: "Montserrat, sans-serif" }}>
                    {item.title === 'Carbon Footprint'
                      ? 'kg CO2e emitted'
                      : 'earned from sustainable transactions'}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <div className="tab-controls flex flex-col items-start mb-8">
        <div className="mb-2">
          <h2 className="text-lg font-semibold" style={{fontFamily: "Montserrat, sans-serif" }}>Get Monthly Financial Summary and Environmental Impact Report</h2>
        </div>

        <div className="flex items-center">
          <div className="dropdown">
            <select
              className="p-2 border rounded-md bg-white focus:outline-none"
              onChange={handleDropdownChange} 
              value={selectedMonth ? monthsDropdown[selectedMonth - 1] : ""}
              style={{fontFamily: "Montserrat, sans-serif" }}
            >
              <option value="" disabled selected style={{fontFamily: "Montserrat, sans-serif" }}>Select a Month</option>
              {monthsDropdown.map((month, index) => (
                <option key={index} value={month} disabled={index > currentMonth} style={{fontFamily: "Montserrat, sans-serif" }}> 
                  {month}
                </option>
              ))}
            </select>
          </div>

          <button
            className="ml-2 px-4 py-1.5 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none"
            onClick={handleButtonClick}
            style={{fontFamily: "Montserrat, sans-serif" }}
          >
            Get Email
          </button>
        </div>
      </div>

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


      <div className="tabs mb-8">
        {tabs
          .filter(tab => !tab.role || tab.role.includes(user?.role)) // Filter based on role
          .map((tab) => (
            <button
              key={tab.id}
              className={`tab ${tabValue === tab.id ? 'active' : ''}`}
              onClick={(event) => handleChangeTab(event, tab.id)}
            >
              {tab.label}
            </button>
          ))}
      </div>

      {tabValue === 0 && (
        <div key={tabValue}>
          <div className="mt-12" style={{ display: 'flex', flexWrap: 'wrap', gap: '65px', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
              {/* Chart 1 */}
              <Card style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px', marginLeft: '20px', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
                  Spending vs Savings
                </Typography>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={transactionsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }} />
                      <YAxis 
                        yAxisId="left"
                        orientation="left"
                        stroke="#8884d8"
                        label={{ value: 'Spending ($)', angle: -90, position: 'insideLeft', fontFamily: "'Montserrat', sans-serif" }}
                        tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        stroke="#82ca9d"
                        label={{ value: 'Savings ($)', angle: 90, position: 'insideRight', fontFamily: "'Montserrat', sans-serif" }}
                        tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}
                      />
                      <Tooltip contentStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
                      <Line yAxisId="left" type="monotone" dataKey="spending" strokeWidth={3} stroke="#8884d8" />
                      <Line yAxisId="right" type="monotone" dataKey="saving" strokeWidth={3} stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
              {/* Chart 2 */}
              <Card style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px', marginLeft: '20px', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
                  Monthly Transactions & Miles
                </Typography>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={milesData}
                    barCategoryGap="10%" // Adjust the space between categories (bars)
                    barGap={50} // Adjust the space between bars within a category
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
                      <YAxis 
                      yAxisId="left"
                        orientation="left"
                        tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}
                        />
                      <YAxis 
                      yAxisId="right"
                        orientation="right"
                        tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
                      <Tooltip contentStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
                      <Legend wrapperStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
                      <Bar yAxisId="left" dataKey="transactions" fill={COLORS.orange} name="Number of Transactions" />
                      <Bar yAxisId="right" dataKey="miles" fill={COLORS.green} name="Miles Earned" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {tabValue === 1 && (
        <div className="m-10">
          <div className="mt-12" style={{ display: 'flex', flexWrap: 'wrap', gap: '65px', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            {/* Chart 3 */}
            <Card style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px', marginLeft: '20px', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
                Carbon Output Distribution
              </Typography>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={carbonTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, value }) => `${name} (${value})`}
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <Cell fill={COLORS.red} />
                      <Cell fill={COLORS.green} />
                    </Pie>
                    <Tooltip contentStyle={{
            fontFamily: "'Montserrat', sans-serif",  // Customize font family
            fontSize: 12,  // Customize font size
          }}/>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            </div>
            <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
              {/* Chart 4 */}
              <Card style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px', marginLeft: '20px', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}> 
                  Monthly Carbon Output Analysis
                </Typography>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyCarbon}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
                      <YAxis tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
                      <Tooltip contentStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
                      <Legend wrapperStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
                      <Bar dataKey="type1" stackId="a" fill={COLORS.red} name="Carbon Emitted" />
                      <Bar dataKey="type2" stackId="a" fill={COLORS.green} name="Carbon Credits Earned" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {tabValue === 2 && (
        <div className="m-10">
          <div className="mt-12" style={{ display: 'flex', flexWrap: 'wrap', gap: '65px', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
              {/* Chart 5 */}
              <Card style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px', marginLeft: '20px', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
                  Investment Distribution by Bundle
                </Typography>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={investmentsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: $${value}`}
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {investmentsData.map((entry) => (
                          <Cell key={entry.name} fill={BUNDLE_COLORS[entry.name]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{
            fontFamily: "'Montserrat', sans-serif",  // Customize font family
            fontSize: 12,  // Customize font size
          }}/>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
