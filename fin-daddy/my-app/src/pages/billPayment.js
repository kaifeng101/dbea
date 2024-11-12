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
  const [filteredBillingOrganizations, setFilteredBillingOrganizations] = useState([]);

  const user = useSelector(selectUser);
  const userID = user?.customerId;

  const today = new Date();
    today.setDate(today.getDate() + 1); // Add 1 day to today's date
    const nextDay = today.toISOString().split("T")[0]; // Get the next day in YYYY-MM-DD format

  // List of predefined billing organizations
  const billingOrganizations = [
    { id: "0000004455", name: "Adobe Premiere Pro - 0000004455" },
    { id: "0000004457", name: "Amazon Prime - 0000004457" },
    { id: "0000004476", name: "Netflix - 0000004476" },
    { id: "0000004441", name: "Coffee Bean - 0000004441" },
    { id: "0000004469", name: "Housing Development Board - 0000004469" },
  ];

  const getAccounts = useCallback(async () => {
    if (!userID) return;

    const url = `https://personal-svyrscxo.outsystemscloud.com/AccountRegistration/rest/AccountType/GetAccountType?customerId=${userID}`;
    
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d", // Use the required header
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
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
    setFilteredBillingOrganizations(
      billingOrganizations.filter((org) =>
        org.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedToAccount(suggestion.name);
    setFilteredBillingOrganizations([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        console.log(response.data);
        setTransactionResult(response.data);
      }
    } catch (error) {
      console.log("Error during transaction:", error);
      setError("Transaction failed. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Montserrat, sans-serif", marginTop: "58px" }}>
      <h1 style={{ textAlign: "center", color: "#44403c",fontSize: "30px", marginBottom:"10px" }}>Bill Payment Details</h1>

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

<Box
  display="flex"
  flexDirection={{ xs: 'column', md: 'row' }}
  alignItems="center"
  gap={2}
  mb={1}
  position="relative"  // Ensures the dropdown is positioned relative to this container
>
  <TextField
    label="Enter billing organization"
    variant="filled"
    value={selectedToAccount}
    onChange={handleToAccountChange}
    fullWidth
    required
    sx={{
      '& .MuiFormLabel-root': {
        fontFamily: "'Montserrat', sans-serif",
      },
      '& .MuiInputBase-root': {
        fontFamily: "'Montserrat', sans-serif",
      },
      width: "100%",  // Ensures full width within its parent container
      maxWidth: "500px", // Optional: limit the max width to prevent it from becoming too wide
    }}
  />

  {filteredBillingOrganizations.length > 0 && (
    <div
      style={{
        position: "absolute", // Position it absolutely below the input field
        top: "100%", // Position directly below the TextField
        left: 0, // Align to the left of the TextField
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
        marginTop: "5px",
        width: "100%", // Ensures the dropdown aligns with the input
        maxHeight: "200px",
        overflowY: "auto",
      }}
    >
      {filteredBillingOrganizations.map((org) => (
        <div
          key={org.id}
          onClick={() => handleSuggestionClick(org)}
          style={{
            padding: "10px",
            cursor: "pointer",
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
          min={nextDay}
          onChange={(e) => setTransactionReference(e.target.value)}  // Adjust as needed
          required
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />

        <label style={{ fontWeight: "bold" }}>Transaction Reference</label>
        <input
          placeholder="Enter transaction reference"
          type="text"
          //value={transactionReference}
          //onChange={(e) => setTransactionReference(e.target.value)}
          required
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
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #328511", borderRadius: "4px" }}>
          <p><strong>Transaction Successful!</strong></p>
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
