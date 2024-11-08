// src/pages/Authorisation.js

import React, { useState } from "react";

function Authorisation() {
  // Dummy data for bank accounts and vendor categories
  const bankAccounts = [
    { id: 1, name: "Account 1 - XXXX1234" },
    { id: 2, name: "Account 2 - XXXX5678" },
    { id: 3, name: "Account 3 - XXXX9101" },
  ];

  const vendorCategories = ["Utilities", "Subscription", "Insurance", "Loan Payment", "Other"];

  // State for form fields
  const [selectedAccount, setSelectedAccount] = useState("");
  const [payeeAccount, setPayeeAccount] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [vendorCategory, setVendorCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form data here
    console.log({
      selectedAccount,
      payeeAccount,
      payeeName,
      frequency,
      amount,
      paymentDate,
      vendorCategory,
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#4a90e2" }}>Direct Debit Payment Authorisation</h1>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        {/* From Section */}
        <div>
          <label htmlFor="fromAccount" style={{ fontWeight: "bold" }}>From:</label>
          <select 
            id="fromAccount"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            style={{ marginTop: "5px", padding: "10px", width: "100%", borderRadius: "4px", border: "1px solid #ccc" }}
            required
          >
            <option value="" disabled>Select an account</option>
            {bankAccounts.map((account) => (
              <option key={account.id} value={account.name}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        {/* To Section */}
        <div>
          <label style={{ fontWeight: "bold" }}>To:</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "5px" }}>
            <input 
              type="text" 
              placeholder="Payee Account" 
              value={payeeAccount}
              onChange={(e) => setPayeeAccount(e.target.value)}
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", width: "100%" }}
              required
            />
            <input 
              type="text" 
              placeholder="Payee Name" 
              value={payeeName}
              onChange={(e) => setPayeeName(e.target.value)}
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", width: "100%" }}
              required
            />
            <select 
              value={frequency} 
              onChange={(e) => setFrequency(e.target.value)}
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", width: "100%" }}
              required
            >
              <option value="" disabled>Select frequency</option>
              <option value="one-time">One-time</option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <input 
              type="number" 
              placeholder="Amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", width: "100%" }}
              required
            />
            <input 
              type="date" 
              placeholder="Payment Date" 
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", width: "100%" }}
              required
            />
            <select 
              value={vendorCategory} 
              onChange={(e) => setVendorCategory(e.target.value)}
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", width: "100%" }}
              required
            >
              <option value="" disabled>Select vendor category</option>
              {vendorCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          style={{
            padding: "12px 20px",
            backgroundColor: "#4a90e2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Authorisation;
