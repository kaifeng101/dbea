import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";

const Transactions = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("shopping");
  const [roundUpChoice, setRoundUpChoice] = useState("nearest dollar");
  const [customRoundUp, setCustomRoundUp] = useState("");
  const [paymentMethod] = useState("QR payment");
  const [finalAmount, setFinalAmount] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector(selectUser);
  const userID = user?.customerId
  const apiKey = 'c48b5803-757e-414d-9106-62ab010a9c8d'; 
  console.log(userID)

  const getAccountID = useCallback(async()=>{
    const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/customer/${userID}/accounts`;
    try{
      const username = "12173e30ec556fe4a951";
      const password =
        "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0";

      const basicAuth = "Basic " + btoa(`${username}:${password}`);
      const response = await axios.get(url,{
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
    });
      if (response.status === 200) {
        const data = response.data;
        console.log(data)
      }
  } catch (error) {
    console.log("Error")
  } 

  }, [userID, apiKey]);

  // Fetch beneficiaries data (dummy data for now)
  useEffect(() => {
    // Dummy data - replace this with actual API call if needed
    getAccountID()
  }, []);

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleRoundUpChange = (e) => {
    setRoundUpChoice(e.target.value);
    if (e.target.value !== "other") setCustomRoundUp(""); // Clear custom amount if not "other"
  };
  const handleCustomRoundUpChange = (e) => setCustomRoundUp(e.target.value);
  // const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);
  const handleBeneficiaryChange = (e) => setSelectedBeneficiary(e.target.value);

  // Calculate the final amount based on the round-up choice
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
    if (!amount || !category || !paymentMethod || !finalAmount || (paymentMethod === "credit transfer" && !selectedBeneficiary)) {
      setErrorMessage("Please complete all fields before submitting.");
      return;
    }
    setErrorMessage("");

    const transactionData = {
      amount,
      category,
      paymentMethod,
      roundUp: roundUpChoice === "other" ? customRoundUp : roundUpChoice,
      finalAmount,
      beneficiaryId: selectedBeneficiary,
    };

    try {
      const response = await axios.post("https://<your-outsystems-endpoint-url>/transactions", transactionData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Transaction submitted successfully:", response.data);
      alert("Transaction submitted successfully!");
    } catch (error) {
      console.error("Error submitting transaction:", error);
      alert("Failed to submit transaction.");
    }
  };

  return (
    <div style={styles.container} className="mt-24">
      <h1>Transaction Form</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
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
        
        <div style={styles.formGroup}>
          <label>Spending Category:</label>
          <select value={category} onChange={handleCategoryChange} required style={styles.select}>
            <option value="shopping">Shopping</option>
            <option value="household goods">Household Goods</option>
            <option value="transportation">Transportation</option>
            <option value="leisure & entertainment">Leisure & Entertainment</option>
            <option value="travel & accommodation">Travel & Accommodation</option>
            <option value="others">Others</option>
          </select>
        </div>
        
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

        {/* <div style={styles.formGroup}>
          <label>Payment Method:</label>
          <select value={paymentMethod} onChange={handlePaymentMethodChange} required style={styles.select}>
            <option value="QR payment">QR Payment</option>
            <option value="credit transfer">Credit Transfer</option>
          </select>
        </div> */}

        {paymentMethod === "credit transfer" && (
          <div style={styles.formGroup}>
            <label>Select Beneficiary:</label>
            <select value={selectedBeneficiary} onChange={handleBeneficiaryChange} required style={styles.select}>
              <option value="">Select Beneficiary</option>
              {beneficiaries.map((beneficiary) => (
                <option key={beneficiary.id} value={beneficiary.id}>
                  {beneficiary.name} (Account ID: {beneficiary.accountId})
                </option>
              ))}
            </select>
          </div>
        )}

        <div style={styles.finalAmountSection}>
          <h3>Final Amount (Rounded):</h3>
          <p>${finalAmount}</p>
        </div>
        
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        <button type="submit" style={styles.button}>Submit Transaction</button>
      </form>
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
  },
  input: {
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  select: {
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  finalAmountSection: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#e9ecef",
    borderRadius: "8px",
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "1rem",
  },
};

export default Transactions;
