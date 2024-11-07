import React, { useState, useEffect, useCallback, useMemo} from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Analytics = () => {

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
        <h1>Analytics PAGE</h1>
        <div className="w-full max-w-4xl mx-auto mt-20">
          <h1 className="text-3xl font-bold mb-6">Analytics</h1>
          <Card>
            <CardHeader>
              <CardTitle>Spending vs Saving</CardTitle>
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
