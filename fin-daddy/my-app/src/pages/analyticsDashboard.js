import React, {useEffect, useState} from "react";
// import { useSelector } from "react-redux";
import axios from 'axios';
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts'

const Analytics = () => {
  const [carbonTypeData, setCarbonTypeData] = useState([]);
  const [monthlyCarbon, setMonthlyCarbon] = useState([]);
  const [currentMiles, setCurrentMiles] = useState();
  const apiKey = 'c48b5803-757e-414d-9106-62ab010a9c8d'; // Replace with your API key
  const user = useSelector(selectUser);
  const userID = user?.customerId

  const getCarbonData = async () => {
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

        const carbonTypeTotals = data.reduce((acc, item) => {
          const carbonTypeKey = `Type ${item.CarbonType}`;
          acc[carbonTypeKey] = (acc[carbonTypeKey] || 0) + parseFloat(item.Value);
          return acc;
        }, {});

        const carbonTypeArray = Object.keys(carbonTypeTotals).map(key => ({
          name: `${key} (Bad Carbon)`, // Adjust label as needed
          value: parseFloat(carbonTypeTotals[key].toFixed(1))
        }));
  
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
  };

  const getCurrentMiles = async () => {
    const url = `https://personal-lykkncb1.outsystemscloud.com/MilesCRUD/rest/CustMiles/GetMiles?CustomerId=AAA`; // Replace with your endpoint URL
    
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
  }
  
  useEffect(() => {
    getCarbonData();
    getCurrentMiles();
  }, []);

  const data = [
    { name: 'Jan', spending: 4000, saving: 2400 },
    { name: 'Feb', spending: 3000, saving: 1398 },
    { name: 'Mar', spending: 2000, saving: 9800 },
    { name: 'Apr', spending: 2780, saving: 3908 },
    { name: 'May', spending: 1890, saving: 4800 },
    { name: 'Jun', spending: 2390, saving: 3800 },
  ]

  const monthlyData = [
    { month: 'Jan', transactions: 100, miles: 390 },
    { month: 'Feb', transactions: 120, miles: 300 },
    { month: 'Mar', transactions: 90, miles: 270 },
    { month: 'Apr', transactions: 115, miles: 340 },
    { month: 'May', transactions: 75, miles: 320 },
    { month: 'Jun', transactions: 70, miles: 140 },
    { month: 'Jul', transactions: 105, miles: 130 },
    { month: 'Aug', transactions: 140, miles: 360 },
    { month: 'Sep', transactions: 135, miles: 210 },
    { month: 'Oct', transactions: 100, miles: 440 },
    { month: 'Nov', transactions: 55, miles: 330 },
    { month: 'Dec', transactions: 140, miles: 460 },
  ]

  // const carbonTypeData = [
  //   { name: 'Type 1 (Bad Carbon)', value: 57.1 },
  //   { name: 'Type 2 (Good Carbon)', value: 42.9 },
  // ]

  // const monthlyCarbon = [
  //   { month: 'Jan', type1: 280, type2: 60 },
  //   { month: 'Feb', type1: 310, type2: 160 },
  //   { month: 'Mar', type1: 300, type2: 270 },
  //   { month: 'Apr', type1: 100, type2: 110 },
  //   { month: 'May', type1: 290, type2: 140 },
  //   { month: 'Jun', type1: 190, type2: 240 },
  //   { month: 'Jul', type1: 140, type2: 90 },
  //   { month: 'Aug', type1: 310, type2: 210 },
  //   { month: 'Sep', type1: 200, type2: 150 },
  //   { month: 'Oct', type1: 350, type2: 120 },
  //   { month: 'Nov', type1: 200, type2: 260 },
  //   { month: 'Dec', type1: 360, type2: 290 },
  // ]

  const COLORS = {
    green: '#22c55e',
    red: '#ef4444',
    orange: '#f97316',
    blue: '#3b82f6',
  }

  const summaryData = [
    { title: 'Total Spending', value: '$20,000', color: '#ef4444' },
    { title: 'Total Savings', value: '$12,500', color: '#22c55e' },
    { title: 'Total Transactions', value: '1,200', color: '#3b82f6' },
    { title: 'Carbon Footprint', value: '57.1% Bad, 42.9% Good', color: '#f97316' },
    { title: 'Total Miles ', value: currentMiles, color: '#f97316' },
  ];

  const investmentDistribution = [
    { name: 'Bundle A', value: 4000 },
    { name: 'Bundle B', value: 3000 },
    { name: 'Bundle C', value: 5000 },
  ];

  const monthlyInvestments = [
    { month: 'Jan', bundleA: 1000, bundleB: 1200, bundleC: 800 },
    { month: 'Feb', bundleA: 1500, bundleB: 1000, bundleC: 900 },
    { month: 'Mar', bundleA: 2000, bundleB: 1300, bundleC: 1100 },
    { month: 'Apr', bundleA: 1700, bundleB: 1600, bundleC: 1300 },
    { month: 'May', bundleA: 1900, bundleB: 1400, bundleC: 1500 },
    { month: 'Jun', bundleA: 1800, bundleB: 1200, bundleC: 1400 },
  ];

  const BUNDLE_COLORS = {
    'Bundle A': '#0088FE',
    'Bundle B': '#00C49F',
    'Bundle C': '#FFBB28',
  };

  return (
    <div className="m-20">
       <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        {summaryData.map((item, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Card style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="subtitle1" component="div" style={{ color: '#555', marginBottom: '5px' }}>
                  {item.title}
                </Typography>
                <Typography variant="h5" component="div" style={{ fontWeight: 'bold', color: '#333' }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>


      <div className="mt-12" style={{ display: 'flex', flexWrap: 'wrap', gap: '65px', justifyContent: 'space-between' }}>
        <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
          {/* Chart 1 */}
          <Card style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px', marginLeft: '20px' }}>
              Spending vs Savings
            </Typography>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="spending" stroke="#8884d8" />
                  <Line type="monotone" dataKey="saving" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
          {/* Chart 2 */}
          <Card style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px', marginLeft: '20px' }}>
              Monthly Transactions & Miles
            </Typography>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="transactions" fill={COLORS.orange} name="Number of Transactions" />
                  <Bar dataKey="miles" fill={COLORS.green} name="Miles Earned" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
          {/* Chart 3 */}
          <Card style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px', marginLeft: '20px' }}>
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
                  >
                    <Cell fill={COLORS.red} />
                    <Cell fill={COLORS.green} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
          {/* Chart 4 */}
          <Card style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px', marginLeft: '20px' }}> 
              Monthly Carbon Output Analysis
            </Typography>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyCarbon}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="type1" stackId="a" fill={COLORS.red} name="Type 1 (Bad Carbon)" />
                  <Bar dataKey="type2" stackId="a" fill={COLORS.green} name="Type 2 (Good Carbon)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
          {/* Chart 5 */}
          <Card style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px', marginLeft: '20px' }}>
              Investment Distribution by Bundle
            </Typography>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={investmentDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: $${value}`}
                  >
                    {investmentDistribution.map((entry) => (
                      <Cell key={entry.name} fill={BUNDLE_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
          {/* Chart 6 */}
          <Card style={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px', marginLeft: '20px' }}>
              Monthly Investments by Bundle
            </Typography>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyInvestments}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bundleA" stackId="a" fill={BUNDLE_COLORS['Bundle A']} name="Bundle A" />
                  <Bar dataKey="bundleB" stackId="a" fill={BUNDLE_COLORS['Bundle B']} name="Bundle B" />
                  <Bar dataKey="bundleC" stackId="a" fill={BUNDLE_COLORS['Bundle C']} name="Bundle C" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
