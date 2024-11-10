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

  const user = useSelector(selectUser);
  const userID = user?.customerId;
  const transactionDate = new Date().toLocaleDateString();

  // List of predefined billing organizations
  const billingOrganizations = [
    { id: "0000004455", name: "Adobe Premiere Pro - 0000004455" },
    { id: "0000004457", name: "Amazon Prime - 0000004457" },
    { id: "0000004476", name: "Netflix - 0000004476" },
    { id: "0000004441", name: "Coffee Bean - 0000004441" },
    { id: "0000004469", name: "Housing Development Board - 0000004469" },
  ];
  const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/customer/${userID}/accounts`;
    const username = "12173e30ec556fe4a951";
    const password = "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0";
    const basicAuth = "Basic " + btoa(`${username}:${password}`);

  const getAccounts = useCallback(async () => {
    if (!userID) return;
    

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const filteredAccounts = response.data
          .filter(account => account.productId === "101")
          .map(account => ({ id: account.accountId, name: `Account - ${account.accountId}` }));
        setBankAccounts(filteredAccounts);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }, [userID]);

  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

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
      const response = await axios.put(putUrl, requestData, {
        headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
        });

      // Assuming a successful response
      if (response.status === 200) {
        console.log(response.data)
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
        <select
          value={selectedToAccount}
          onChange={(e) => setSelectedToAccount(e.target.value)}
          required
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        >
          <option value="" disabled>Select a billing organization</option>
          {billingOrganizations.map((org) => (
            <option key={org.id} value={org.name}>
              {org.name}
            </option>
          ))}
        </select>

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
          type="text"
          value={transactionDate}
          disabled
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#f9f9f9" }}
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
