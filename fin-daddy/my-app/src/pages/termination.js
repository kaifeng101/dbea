import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";

function Termination() {
  const user = useSelector(selectUser);
  const userID = user?.customerId;

  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [instructions, setInstructions] = useState([]);

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

        // Filter payments based on selected account ID
        const matchedPayments = data.filter(payment => payment.CustomerAccountId === selectedAccountId);

        const formattedInstructions = matchedPayments.map(payment => ({
          id: payment.DirectDebitId,
          payee: payment.BillingOrgAccountId,
          frequency: payment.Frequency,
          nextPaymentDate: payment.NextPaymentDate,
          lastPayment: payment.LastPaymentDate,
        }));

        setInstructions(formattedInstructions);
        setShowTable(true);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleRemove = async (id, payee) => {
    if (window.confirm("Are you sure you want to terminate this payment?")) {
      const selectedAccountId = bankAccounts.find(account => account.name === selectedAccount)?.id;
      const url = `https://personal-g2wuuy52.outsystemscloud.com/TransactionRoundUp/rest/PaymentToMerchant/RemoveDirectDebit`;
  
      try {
        const response = await axios.delete(url, {
          headers: {
            "Content-Type": "application/json",
            "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d",
          },
          data: {
            accountId: selectedAccountId,
            billingOrgAccId: payee
          },
        });
  
        if (response.status === 200 && response.data.Status) {
          // Remove only the row that was clicked
          setInstructions(prevInstructions => 
            prevInstructions.filter(instruction => instruction.id !== id)
          );
  
          // Show the status message
          alert(response.data.Status);
        }
      } catch (error) {
        console.log("Error:", error);
        alert("An error occurred while trying to terminate the payment.");
      }
    }
  };
  

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Montserrat, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#44403c",fontSize: "25px"  }}>I want to terminate payment for:</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
        <label htmlFor="accountSelect" style={{ fontWeight: "bold", marginBottom: "5px" }}>Account:</label>
        
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
            marginTop:"20px"
          }}
        >
          Submit
        </button>
      </form>

      {showTable && (
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ color: "black", marginBottom: "20px" }}>All direct debit authorisations for {selectedAccount}</h2>

          <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <thead>
              <tr style={{ backgroundColor: "#a8a39e", color: "#fff", textAlign: "left" }}>
                <th style={{ padding: "10px" }}>Payee/References</th>
                <th style={{ padding: "10px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructions.map((instruction) => (
                <tr key={instruction.id} style={{ backgroundColor: "#f9f9f9" }}>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{instruction.payee}</td>

                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    <button
                      onClick={() => handleRemove(instruction.id, instruction.payee)}
                      style={{
                        padding: "5px 10px",
                        color: "#fff",
                        backgroundColor: "#e74c3c",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Termination;
