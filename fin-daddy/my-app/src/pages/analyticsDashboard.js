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
// import Typography from '@mui/material/Typography';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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

  return (
    <div>
        <div className="w-full max-w-4xl mx-auto mt-10">
          <h1 className="text-3xl font-bold mb-6">Analytics</h1>
          <Card>
            <CardHeader>
              <h1>Spending vs Saving</h1>
            </CardHeader>
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
    </div>
  );
};

export default Analytics;
