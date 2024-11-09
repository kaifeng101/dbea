import React, { useEffect} from "react";
// import { useSelector } from "react-redux";
import axios from 'axios';
// import { selectUser } from "../redux/userSlice";
// import { useParams, useNavigate } from "react-router-dom";
// import { Card, CardHeader, CardTitle, CardContent } from "@ui/card"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
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

  const getData = async () => {
    const url = `https://personal-svyrscx0.outsystemscloud.com/CustomerCarbon/rest/CarbonTransaction/GetCarbonTransactions?CustomerId=1`; // Replace with your endpoint URL
    const apiKey = 'c48b5803-757e-414d-9106-62ab010a9c8d'; // Replace with your API key
    
    try {
      const response = await axios.get(url, {
        headers: {
          'X-Contacts-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const result = response.data;
        console.log('Response Data:', result);
      }
    } catch (error) {
      console.log("Error")
    } 
  };
  
  // Call the function in your component or useEffect
  useEffect(() => {
    getData();
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

  const carbonTypeData = [
    { name: 'Type 1 (Bad Carbon)', value: 57.1 },
    { name: 'Type 2 (Good Carbon)', value: 42.9 },
  ]

  const monthlyCarbon = [
    { month: 'Jan', type1: 280, type2: 60 },
    { month: 'Feb', type1: 310, type2: 160 },
    { month: 'Mar', type1: 300, type2: 270 },
    { month: 'Apr', type1: 100, type2: 110 },
    { month: 'May', type1: 290, type2: 140 },
    { month: 'Jun', type1: 190, type2: 240 },
    { month: 'Jul', type1: 140, type2: 90 },
    { month: 'Aug', type1: 310, type2: 210 },
    { month: 'Sep', type1: 200, type2: 150 },
    { month: 'Oct', type1: 350, type2: 120 },
    { month: 'Nov', type1: 200, type2: 260 },
    { month: 'Dec', type1: 360, type2: 290 },
  ]

  const COLORS = {
    green: '#22c55e',
    red: '#ef4444',
    orange: '#f97316',
    blue: '#3b82f6',
  }

  return (
    <div>
        <div className="w-full max-w-4xl mx-auto mt-10">
          <h1 className="text-3xl font-bold mb-6">Analytics</h1>
          <Card>
            <Typography gutterBottom variant="h5" component="div">
              Spending vs Savings
            </Typography>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
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
        <div className="w-full max-w-4xl mx-auto mt-10">
          <h1 className="text-3xl font-bold mb-6">Transactions & Miles Earned</h1>
            <Card>
              <Typography gutterBottom variant="h5" component="div">
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
        <div className="w-full max-w-4xl mx-auto mt-10">
          <h1 className="text-3xl font-bold mb-6">Carbon Output Distribution</h1>
          <Card>
            <Typography gutterBottom variant="h5" component="div">
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
                    label={({ name, value }) => `${name} (${value}%)`}
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
        <div className="w-full max-w-4xl mx-auto mt-10">
          <h1 className="text-3xl font-bold mb-6">Monthly Carbon Output Analysis</h1>
          <Card>
            <Typography gutterBottom variant="h5" component="div">
            Monthly Carbon Output Analysis
            </Typography>
            <CardContent className="h-[500px]">
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
    </div>
  );
};

export default Analytics;
