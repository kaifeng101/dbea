import React, { useState, useEffect, useCallback, useMemo} from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container"
import Button from "@mui/material/Button";
import { green, grey } from "@mui/material/colors";


const OnBoarding = () => {
    const [data, setData] = useState(null);
  
    const getData = async (customerId, certificateNo) => {
      const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/customer??CustomerID=0000002313&CertificateNo=000002`; // Replace with your endpoint URL
      const username = "12173e30ec556fe4a951"; // Replace with your username
      const password = "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0"; // Replace with your password
  
      const headers = new Headers();
      headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));
      headers.set('Content-Type', 'application/json');
  
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: headers
        });
    
        if (response.ok) {
          const result = await response.json();
          setData(result);
          console.log("Response Data:", result);
        } else {
          console.error("Error:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Network Error:", error);
      }
    };

  return (
    <div style={{marginTop: "20px"}}>
      <Container style={{marginBottom: "10px"}}>
        <Button onClick={getData}>Get</Button>
      </Container>
    </div>
  );
};

export default OnBoarding;
