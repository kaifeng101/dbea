import React, { useState } from "react";

function BillPayment() {
  // Dummy data for accounts and billing organizations
  const userAccounts = [
    { id: 1, name: "Account 1 - XXXX1234" },
    { id: 2, name: "Account 2 - XXXX5678" },
    { id: 3, name: "Account 3 - XXXX9101" },
  ];

  const billingOrganizations = [
    { id: 1, name: "Electricity Company" },
    { id: 2, name: "Water Services" },
    { id: 3, name: "Internet Provider" },
  ];

  // State variables for form inputs
  const [selectedFromAccount, setSelectedFromAccount] = useState("");
  const [selectedToAccount, setSelectedToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionReference, setTransactionReference] = useState("");
  const transactionDate = new Date().toLocaleDateString();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add logic to handle the form submission
    console.log({
      fromAccount: selectedFromAccount,
      toAccount: selectedToAccount,
      amount,
      transactionReference,
      transactionDate,
    });
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
          {userAccounts.map((account) => (
            <option key={account.id} value={account.name}>
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
    </div>
  );
}

export default BillPayment;
