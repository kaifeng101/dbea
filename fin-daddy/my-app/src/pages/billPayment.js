import React, { useState, useEffect } from "react";

function BillPayment() {
  // State for API data
  const [billingOrganizations, setBillingOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  const getData = async () => {
    const url = "https://smuedu-dev.outsystemsenterprise.com/gateway/rest/payments/Beneficiaries?CustomerId=0000002340&AccountGroup=ALL"; // Replace with your endpoint URL
    const username = "12173e30ec556fe4a951"; // Replace with your username
    const password = "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0"; // Replace with your password

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    headers.set('Content-Type', 'application/json');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      if (response.ok) {
        const result = await response.json();
        // Map data to required format and update state
        const organizations = result.map((item) => ({
          id: item.beneficiaryId,
          name: `${item.customerId} - ${item.description}`,
        }));
        setBillingOrganizations(organizations);
      } else {
        setError(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError("Network Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);



  // Dummy data for user's accounts
  const userAccounts = [
    { id: 1, name: "Account 1 - XXXX1234" },
    { id: 2, name: "Account 2 - XXXX5678" },
    { id: 3, name: "Account 3 - XXXX9101" },
  ];

  // State variables for form inputs
  const [selectedFromAccount, setSelectedFromAccount] = useState("");
  const [selectedToAccount, setSelectedToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionReference, setTransactionReference] = useState("");
  const transactionDate = new Date().toLocaleDateString();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      fromAccount: selectedFromAccount,
      toAccount: selectedToAccount,
      amount,
      transactionReference,
      transactionDate,
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
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

      {loading && <p>Loading billing organizations...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default BillPayment;
