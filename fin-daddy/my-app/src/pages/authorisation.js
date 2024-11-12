import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";

function Authorisation() {
  const user = useSelector(selectUser);
  const userID = user?.customerId;

  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const billingOrganizations = [
    { id: "0000004455", name: "Adobe Premiere Pro - 0000004455" },
    { id: "0000004457", name: "Amazon Prime - 0000004457" },
    { id: "0000004476", name: "Netflix - 0000004476" },
    { id: "0000004441", name: "Coffee Bean - 0000004441" },
    { id: "0000004469", name: "Housing Development Board - 0000004469" },
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

  const handlePayeeNameChange = (event) => {
    setPayeeName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedBillingOrg = billingOrganizations.find(org => org.name === payeeName);

    try {
      const response = await axios.post(
        "https://personal-g2wuuy52.outsystemscloud.com/TransactionRoundUp/rest/PaymentToMerchant/AddDirectDebit?consumerId=api",
        {
          customerId: userID,
          accountId: selectedAccount,
          billingOrgAccId: selectedBillingOrg.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d",
          },
        }
      );

      if (response.data.Status === "Direct debit authorisation successful") {
        setResponseMessage("Direct debit authorisation successful");
      } else {
        setResponseMessage("Direct debit authorisation unsuccessful");
      }
    } catch (error) {
      console.log("Error:", error);
      setResponseMessage("Direct debit authorisation unsuccessful");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Montserrat, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#44403c",fontSize: "30px" }}>Direct Debit Payment Authorisation</h1>
      
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
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        {/* To Section */}
        <div>
          <label style={{ fontWeight: "bold" }}>To:</label>
          <select 
            id="payeeName" 
            value={payeeName}
            onChange={handlePayeeNameChange}
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", width: "100%" }}
            required
          >
            <option value="" disabled>Select a payee</option>
            {billingOrganizations.map((org) => (
              <option key={org.id} value={org.name}>
                {org.name}
              </option>
            ))}
          </select>
        </div>

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
            marginTop:"20px"
          }}
        >
          Authorize
        </button>
      </form>

      {/* Display response message */}
      {responseMessage && (
        <p style={{ marginTop: "20px", color: responseMessage.includes("successful") ? "green" : "red" }}>
          {responseMessage}
        </p>
      )}
    </div>
  );
}

export default Authorisation;
