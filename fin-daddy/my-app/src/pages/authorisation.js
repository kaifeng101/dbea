import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";

function Authorisation() {
  // State for form fields
  const user = useSelector(selectUser);
  const userID = user?.customerId;
  const apiKey = 'c48b5803-757e-414d-9106-62ab010a9c8d'; 

  const [bankAccounts, setBankAccounts] = useState([]); // Will hold accounts from API
  const [selectedAccount, setSelectedAccount] = useState("");
  const [payeeAccount, setPayeeAccount] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [vendorCategory, setVendorCategory] = useState("");

  const vendorCategories = ["Utilities", "Subscription", "Insurance", "Loan Payment", "Other"];

 const getAccounts = useCallback(async () => {
    const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/customer/${userID}/accounts`;
    try {
      const username = "12173e30ec556fe4a951";
      const password = "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0";
      const basicAuth = "Basic " + btoa(`${username}:${password}`);
      
      const response = await axios.get(url, {
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        // Filter accounts where productId is "101" and map to accountId for dropdown
        const filteredAccounts = data
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

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
            onChange={handleAccountChange}
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
