import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUser } from "../redux/userSlice";

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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif", marginTop: "96px" }}>
      <h1 style={{ textAlign: "center", color: "#4a90e2" }}>Bill Payment Details</h1>

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
        <input
          type="text"
          value={selectedToAccount}
          onChange={handleToAccountChange}
          required
          placeholder="Enter billing organization"
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        {filteredBillingOrganizations.length > 0 && (
          <div style={{ border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#f9f9f9", marginTop: "5px" }}>
            {filteredBillingOrganizations.map((org) => (
              <div
                key={org.id}
                onClick={() => handleSuggestionClick(org)}
                style={{ padding: "10px", cursor: "pointer" }}
              >
                {org.name}
              </div>
            ))}
          </div>
        )}

        <label style={{ fontWeight: "bold" }}>Amount ($)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="Enter amount"
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
          type="text"
          value={transactionReference}
          onChange={(e) => setTransactionReference(e.target.value)}
          required
          placeholder="Enter transaction reference"
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#4a90e2",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Submit
        </button>
      </form>

      {transactionResult && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #4a90e2", borderRadius: "4px" }}>
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
