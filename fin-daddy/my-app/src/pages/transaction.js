import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";

const Transactions = () => {
  const [amount, setAmount] = useState("");
  //const [category, setCategory] = useState("shopping");
  const [roundUpChoice, setRoundUpChoice] = useState("nearest dollar");
  const [customRoundUp, setCustomRoundUp] = useState("");
  //const [paymentMethod] = useState("QR payment");
  const [finalAmount, setFinalAmount] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [depositBalance, setDepositBalance] = useState(null);
  const [savingsBalance, setSavingsBalance] = useState(null);
  const [savingsId, setSavingsId] = useState(""); // New state for savingsId
  const user = useSelector(selectUser);
  const userID = user?.customerId;

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
        setSavingsId(data.savingaccountId); // Store the savingaccountId as savingsId
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

  const handleAmountChange = (e) => setAmount(e.target.value);
  //const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleRoundUpChange = (e) => {
    setRoundUpChoice(e.target.value);
    if (e.target.value !== "other") setCustomRoundUp("");
  };
  const handleCustomRoundUpChange = (e) => setCustomRoundUp(e.target.value);

  useEffect(() => {
    const calculateFinalAmount = () => {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) return "";

      switch (roundUpChoice) {
        case "nearest dollar":
          return Math.ceil(parsedAmount);
        case "nearest ten":
          return Math.ceil(parsedAmount / 10) * 10;
        case "nearest hundred":
          return Math.ceil(parsedAmount / 100) * 100;
        case "other":
          const customAmount = parseFloat(customRoundUp);
          return isNaN(customAmount) ? "" : Math.ceil(parsedAmount / customAmount) * customAmount;
        default:
          return parsedAmount;
      }
    };

    setFinalAmount(calculateFinalAmount());
  }, [amount, roundUpChoice, customRoundUp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !selectedAccount || !finalAmount) {
      setErrorMessage("Please complete all fields before submitting.");
      return;
    }
    setErrorMessage("");
  
    const transactionData = {
      transactionAmount: amount,
      roundedAmount: finalAmount,
      categoryId: 1,
      customerId: userID,
      accountId: selectedAccount,
      savingsId: savingsId, // Include savingsId in transaction data
    };
  
    try {
      const response = await axios.post(
        "https://personal-g2wuuy52.outsystemscloud.com/TransactionRoundUp/rest/PaymentToMerchant/AddPayment",
        transactionData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d",
          },
        }
      );
      console.log(transactionData)
  
      // Check if the response indicates an insufficient balance
      if (response.status === 200) {
        if (response.data.status === "Insufficient balance") {
          setErrorMessage("Insufficient balance.");
          setSuccessMessage(""); // Clear any previous success message
        } else {
          // Assume transaction is successful if no insufficient balance status
          setSuccessMessage("Transaction Successful!");
          setDepositBalance(response.data.depositBalance);
          setSavingsBalance(response.data.savingsBalance);
          setErrorMessage(""); // Clear any previous error message
          // Check if the amount is abnormally large and send SMS
        if (finalAmount > 1000) {
          //const smsMessage = `An abnormally large transaction of $${finalAmount} was just made by your account. Please log into your fin-daddy app to check if this transaction was initiated by you. Otherwise, please contact us at 1800 767 4491.`;

          const smsData = {
            mobile: user?.number, // Replace with the correct mobile property from user session
            message: "An abnormally large transaction was just made by your account. If this was not you, contact us at 1800 767 4491.",
          };

          try {
            const username = "12173e30ec556fe4a951";
            const password = "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0";
            const basicAuth = "Basic " + btoa(`${username}:${password}`);
            await axios.post(
              "https://smuedu-dev.outsystemsenterprise.com/SMULab_Notification/rest/Notification/SendSMS",
              smsData,
              {
                headers: {
                  "Authorization": basicAuth,
                  "Content-Type": "application/json",
                },
              }
            );
            console.log("SMS alert sent successfully");
          } catch (smsError) {
            console.error("Error sending SMS alert:", smsError);
          }
        }
      
        }
      }
    } catch (error) {
      console.error("Error submitting transaction:", error);
      alert("Failed to submit transaction.");
    }
  };
  

  return (
    // <Card>
    <div style={styles.container} className="mt-24">
      <h1>Transaction Form</h1>
      <form onSubmit={handleSubmit} style={styles.form}>

        <div style={styles.formGroup}>
          <label>Select Account:</label>
          <select value={selectedAccount} onChange={handleAccountChange} required style={styles.select}>
            <option value="">Select Account</option>
            {bankAccounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            required
            style={styles.input}
          />
        </div>

        {/* <div style={styles.formGroup}>
          <label>Spending Category:</label>
          <select value={category} onChange={handleCategoryChange} required style={styles.select}>
            <option value="shopping">Shopping</option>
            <option value="household goods">Household Goods</option>
            <option value="transportation">Transportation</option>
            <option value="leisure & entertainment">Leisure & Entertainment</option>
            <option value="travel & accommodation">Travel & Accommodation</option>
            <option value="others">Others</option>
          </select>
        </div> */}

        <div style={styles.formGroup}>
          <label>Round-Up Choice:</label>
          <select value={roundUpChoice} onChange={handleRoundUpChange} required style={styles.select}>
            <option value="nearest dollar">Nearest Dollar</option>
            <option value="nearest ten">Nearest Ten</option>
            <option value="nearest hundred">Nearest Hundred</option>
            <option value="other">Other</option>
          </select>
        </div>

        {roundUpChoice === "other" && (
          <div style={styles.formGroup}>
            <label>Custom Round-Up Amount:</label>
            <input
              type="number"
              value={customRoundUp}
              onChange={handleCustomRoundUpChange}
              placeholder="Enter custom round-up amount"
              required
              style={styles.input}
            />
          </div>
        )}

        <div style={styles.finalAmountSection}>
          <h3>Final Amount (Rounded):</h3>
          <p>${finalAmount}</p>
        </div>

        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        <button type="submit" style={styles.button}>Submit Transaction</button>
      </form>

      {successMessage && (
        <div style={styles.successMessage}>
          <h2>{successMessage}</h2>
          <p>Remaining Deposit Balance: ${depositBalance}</p>
          <p>Savings Balance: ${savingsBalance}</p>
        </div>
      )}
    </div>
  );
};


// Styles for the page elements
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "Montserrat, sans-serif",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  form: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    fontFamily: "Montserrat, sans-serif",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "600",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontFamily: "Montserrat, sans-serif",
  },
  select: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontFamily: "Montserrat, sans-serif",
  },
  finalAmountSection: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#e9ecef",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  successMessage: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#d4edda",
    borderRadius: "8px",
    textAlign: "center",
    color: "#155724",
    fontFamily: "Montserrat, sans-serif",
  },
  errorMessage: {
    color: "red",
    fontFamily: "Montserrat, sans-serif",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#44403c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "Montserrat, sans-serif",
  },
};


export default Transactions;
