import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";

function DirectDebitPayment() {
  const user = useSelector(selectUser);
  const userID = user?.customerId;
  const apiKey = 'c48b5803-757e-414d-9106-62ab010a9c8d'; 

  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/payments/DirectdebitAuthorizations?CustomerId=${userID}`;
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
        const selectedAccountId = bankAccounts.find(account => account.name === selectedAccount)?.id;
        
        // Find payment data matching the selected account ID
        const matchedPayment = data.find(payment => payment.CustomerAccountId === selectedAccountId);
        if (matchedPayment) {
          setPaymentData({
            creationDate: matchedPayment.CreationDate,
            billingOrgAccountId: matchedPayment.BillingOrgAccountId,
          });
          setShowTable(true);
        } else {
          setPaymentData(null);
          setShowTable(false);
          alert("No matching payment data found for the selected account.");
        }
      }
    } catch (error) {
      console.log("Error fetching payment data:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4a90e2" }}>View Direct Debit Payments</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "16px", color: "#333" }}>I would like to review:</p>
        
        <label htmlFor="accountSelect" style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Designated Bank Account
        </label>
        
        <select 
          id="accountSelect"
          value={selectedAccount}
          onChange={handleAccountChange}
          style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px" }}
          required
        >
          <option value="" disabled>Select an account</option>
          {bankAccounts.map((account) => (
            <option key={account.id} value={account.name}>
              {account.name}
            </option>
          ))}
        </select>

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
            alignSelf: "flex-start"
          }}
        >
          Submit
        </button>
      </form>

      {showTable && paymentData && (
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ color: "#4a90e2", marginBottom: "20px" }}>Direct Debit Payment Details</h2>

          <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <thead>
              <tr style={{ backgroundColor: "#4a90e2", color: "#fff", textAlign: "left" }}>
                <th style={{ padding: "10px" }}>Creation Date</th>
                <th style={{ padding: "10px" }}>Billing Org Account ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{paymentData.creationDate}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{paymentData.billingOrgAccountId}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DirectDebitPayment;
