import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";

function DirectDebitPayment() {
  const user = useSelector(selectUser);
  const userID = user?.customerId;

  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [paymentData, setPaymentData] = useState([]);


  const billingOrganizations = [
    { id: "0000004455", name: "Adobe Premiere Pro - 0000004455" },
    { id: "0000004457", name: "Amazon Prime - 0000004457" },
    { id: "0000004458", name: "America On Line - 0000004458"},
    { id: "0000004459", name: "American Mobile - 0000004459"},
    { id: "0000004471", name: "M1 - 0000004471" },
    { id: "0000004460", name: "British Telecom - 0000004460" },
    { id: "0000004461", name: "China Mobile - 0000004461" },
    { id: "0000004472", name: "Malaysia Telekom-0000004472" },
    { id: "0000004465", name: "Deutsche Telekom - 0000004465" },
    { id: "0000004473", name: "Maxis - 0000004473" },
    { id: "0000004475", name: "MyFitnessPal - 0000004475" },
    { id: "0000004476", name: "Netflix - 0000004476" },
    { id: "0000004454", name: "SingTel - 0000004454" },
    { id: "0000004488", name: "Starhub - 0000004488" },
    { id: "0000004494", name: "Verizon - 0000004494" },
    { id: "0000004495", name: "Vodafone - 0000004495" },
    { id: "0000004480", name: "PandaPro - 0000004480" },
  ];

  const getAccounts = useCallback(async () => {
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
        
        // Filter payment data to find all records matching the selected account ID
        const matchedPayments = data.filter(payment => payment.CustomerAccountId === selectedAccountId);
        
        if (matchedPayments.length > 0) {
          setPaymentData(matchedPayments);
          setShowTable(true);
        } else {
          setPaymentData([]);
          setShowTable(false);
          alert("No matching payment data found for the selected account.");
        }
      }
    } catch (error) {
      console.log("Error fetching payment data:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Montserrat, sans-serif"}}>
      <h1 style={{ textAlign: "center", color: "#44403c",fontSize: "30px"}}>View Direct Debit Payments</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "16px", color: "#333" }}>I would like to review:</p>
        
        
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

      {showTable && paymentData.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ color: "black", marginBottom: "20px" }}>Direct Debit Payment Details</h2>

          <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <thead>
              <tr style={{ backgroundColor: "#706a64", color: "#fff", textAlign: "left" }}>
                <th style={{ padding: "10px" }}>Creation Date</th>
                <th style={{ padding: "10px" }}>Billing Organisation - Account ID</th>
              </tr>
            </thead>
            <tbody>
                {paymentData.map((payment, index) => {
                    // Find the billing organization name based on BillingOrgAccountId
                    const billingOrg = billingOrganizations.find(org => org.id === payment.BillingOrgAccountId);
                    const billingOrgName = billingOrg ? billingOrg.name : payment.BillingOrgAccountId;

                    return (
                    <tr key={index}>
                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{payment.CreationDate}</td>
                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{billingOrgName}</td>
                    </tr>
                    );
                })}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default DirectDebitPayment;
