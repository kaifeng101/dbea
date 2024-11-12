import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUser } from "../redux/userSlice";
import { Box, TextField } from '@mui/material';

function BillPayment() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedFromAccount, setSelectedFromAccount] = useState("");
  const [selectedToAccount, setSelectedToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionReference, setTransactionReference] = useState("");
  const [error, setError] = useState(null);
  const [transactionResult, setTransactionResult] = useState(null);
  const [carbonCheckMessage, setCarbonCheckMessage] = useState(""); // New state for carbon check message
  const [filteredBillingOrganizations, setFilteredBillingOrganizations] = useState([]);

  const user = useSelector(selectUser);
  const userID = user?.customerId;

  const today = new Date();
  const mindate = today.toISOString().split("T")[0];

  const billingOrganizations = [
    { "id": "0000004455", "name": "Adobe Premiere Pro-0000004455", "categoryId": "21" },
    { "id": "0000004457", "name": "Amazon Prime-0000004457", "categoryId": "21" },
    { "id": "0000004458", "name": "America On Line-0000004458", "categoryId": "22" },
    { "id": "0000004459", "name": "American Mobile-0000004459", "categoryId": "22" },
    { "id": "0000004460", "name": "British Telecom-0000004460", "categoryId": "22" },
    { "id": "0000004461", "name": "China Mobile-0000004461", "categoryId": "22" },
    { "id": "0000004462", "name": "China Telecom-0000004462", "categoryId": "22" },
    { "id": "0000004441", "name": "Coffee Bean-0000004441", "categoryId": "21" },
    { "id": "0000004464", "name": "Deliveroo Plus-0000004464", "categoryId": "21" },
    { "id": "0000004465", "name": "Deutsche Telekom-0000004465", "categoryId": "22" },
    { "id": "0000004466", "name": "English Premier League-0000004466", "categoryId": "21" },
    { "id": "0000004468", "name": "Great Eastern Life-0000004468", "categoryId": "21" },
    { "id": "0000004469", "name": "Housing Development Board-0000004469", "categoryId": "21" },
    { "id": "0000004471", "name": "M1-0000004471", "categoryId": "22" },
    { "id": "0000004472", "name": "Malaysia Telekom-0000004472", "categoryId": "22" },
    { "id": "0000004473", "name": "Maxis-0000004473", "categoryId": "22" },
    { "id": "0000004475", "name": "MyFitnessPal-0000004475", "categoryId": "21" },
    { "id": "0000004476", "name": "Netflix-0000004476", "categoryId": "18" },
    { "id": "0000004454", "name": "SingTel-0000004454", "categoryId": "22" },
    { "id": "0000004488", "name": "Starhub-0000004488", "categoryId": "22" },
    { "id": "0000004489", "name": "Strava-0000004489", "categoryId": "21" },
    { "id": "0000004491", "name": "The Business Times-0000004491", "categoryId": "21" },
    { "id": "0000004492", "name": "The Strait Times-0000004492", "categoryId": "21" },
    { "id": "0000004494", "name": "Verizon-0000004494", "categoryId": "21" },
    { "id": "0000004495", "name": "Vodafone-0000004495", "categoryId": "21" },
    { "id": "0000004496", "name": "Zoom-0000004496", "categoryId": "21" }
  ];

  const getAccounts = useCallback(async () => {
    if (!userID) return;

    const url = `https://personal-svyrscxo.outsystemscloud.com/AccountRegistration/rest/AccountType/GetAccountType?customerId=${userID}`;
    
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setBankAccounts([{ id: data.accountId, name: `Account ${data.accountId}` }]);
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Failed to load accounts. Please try again.");
    }
  }, [userID]);

  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  const handleToAccountChange = (e) => {
    const inputValue = e.target.value;
    setSelectedToAccount(inputValue);

    // Filter billing organizations based on input
    const matchedOrganizations = billingOrganizations.filter((org) =>
      org.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredBillingOrganizations(matchedOrganizations);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedToAccount(suggestion.name);
    setFilteredBillingOrganizations([]); // Clear suggestions after selection
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Generate a random two-digit transaction ID
    const transactionId = Math.floor(10 + Math.random() * 90).toString();
  
    // Find the category ID for the selected account to (billing organization)
    const selectedOrg = billingOrganizations.find((org) => org.name === selectedToAccount);
    const categoryId = selectedOrg ? selectedOrg.categoryId : null;
  
    if (!categoryId) {
      setError("Invalid billing organization selected. Please try again.");
      return;
    }
  
    const putUrl = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/account/${userID}/WithdrawCash`;
    const requestData = {
      consumerId: "api",
      transactionId: transactionReference,
      accountId: selectedFromAccount,
      amount: parseFloat(amount),
      narrative: "Bill payment",
    };
  
    try {
      const username = "12173e30ec556fe4a951";
      const password = "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0";
      const basicAuth = "Basic " + btoa(`${username}:${password}`);
      const response = await axios.put(putUrl, requestData, {
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        setTransactionResult(response.data);
  
        // Define the post URL and data for the carbon check
        const postUrl = `https://personal-svyrscxo.outsystemscloud.com/CarbonAssigner/rest/CarbonCheck/Check`;
        const postData = {
          transactionId: transactionId,
          categoryId: categoryId,
          amount: parseFloat(amount),
          customerId: userID,
        };

        // Make the POST request for the carbon check
        try {
          const postResponse = await axios.post(postUrl, postData, {
            headers: {
              "Content-Type": "application/json",
              "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d",
            },
          });
          
          // Set the carbon check message based on response
          if (postResponse.data && postResponse.data.message) {
            setCarbonCheckMessage(postResponse.data.message);
          }
        } catch (postError) {
          console.error("Error during carbon check:", postError);
        }
      }
    } catch (error) {
      console.log("Error during transaction:", error);
      setError("Transaction failed. Please try again.");
    }
  };
  

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Montserrat, sans-serif", marginTop: "96px" }}>
      <h1 style={{ textAlign: "center", color: "#44403c", fontSize: "30px", marginBottom: "10px" }}>Bill Payment Details</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <label style={{ fontWeight: "bold" }}>Account From</label>
        <select
          value={selectedFromAccount}
          onChange={(e) => setSelectedFromAccount(e.target.value)}
          required
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        >
          <option value="" disabled>Select an account</option>
          {bankAccounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>

        <label style={{ fontWeight: "bold" }}>Account To</label>
        <Box display="flex" flexDirection="column" position="relative">
          <TextField
            label="Enter account to"
            variant="outlined"
            value={selectedToAccount}
            onChange={handleToAccountChange}
            required
            sx={{
              '& .MuiFormLabel-root': { fontFamily: "'Montserrat', sans-serif" },
              '& .MuiInputBase-root': { fontFamily: "'Montserrat', sans-serif" },
            }}
          />

          {filteredBillingOrganizations.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
                marginTop: "5px",
                width: "100%",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 10, // Ensure the dropdown appears above other elements
              }}
            >
              {filteredBillingOrganizations.map((org) => (
                <div
                  key={org.id}
                  onClick={() => handleSuggestionClick(org)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {org.name}
                </div>
              ))}
            </div>
          )}
        </Box>

        <label style={{ fontWeight: "bold" }}>Amount ($)</label>
        <input
          placeholder="Enter amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />

        <label style={{ fontWeight: "bold" }}>Transaction Date</label>
        <input
          type="date"
          min={mindate}
          onChange={(e) => setTransactionReference(e.target.value)}
          required
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />

        <label style={{ fontWeight: "bold" }}>Transaction Reference</label>
        <input
          placeholder="Enter transaction reference"
          type="text"
          //value={transactionReference}
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />

        <button
          type="submit"
          style={{
            padding: "0.75rem",
            backgroundColor: "#44403c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Submit
        </button>
      </form>

      {transactionResult && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #328511", borderRadius: "4px", backgroundColor:"white"}}>
          <p><strong>Transaction Successful</strong></p>
          {carbonCheckMessage && <p>{carbonCheckMessage}</p>}
          <p>Balance Before: ${transactionResult.balanceBefore}</p>
          <p>Balance After: ${transactionResult.balanceAfter}</p>
          <p>Transaction ID: {transactionResult.transactionId}</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default BillPayment;


