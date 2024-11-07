import React, { useState, useEffect } from "react";

const Transactions = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("shopping");
  const [roundUpChoice, setRoundUpChoice] = useState("nearest dollar");
  const [customRoundUp, setCustomRoundUp] = useState("");
  const [finalAmount, setFinalAmount] = useState("");

  // Handle changes for each field
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleRoundUpChange = (e) => {
    setRoundUpChoice(e.target.value);
    if (e.target.value !== "other") setCustomRoundUp(""); // Clear custom amount if not "other"
  };
  const handleCustomRoundUpChange = (e) => setCustomRoundUp(e.target.value);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      amount,
      category,
      roundUp: roundUpChoice === "other" ? customRoundUp : roundUpChoice,
      finalAmount,
    };
    console.log("Transaction submitted:", transactionData);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>Transaction Form</h1>
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
          
          <div style={styles.formGroup}>
            <label>Final Amount (Rounded):</label>
            <input
              type="text"
              value={finalAmount}
              readOnly
              style={styles.input}
            />
          </div>
          
          <button type="submit" style={styles.button}>Submit Transaction</button>
        </form>
      </div>
    </div>
  );
};

// Styles for the card and form elements
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "400px",
    textAlign: "center",
  },
  header: {
    marginBottom: "1.5rem",
    fontSize: "24px",
    color: "#333",
  },
  form: {
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
    marginTop: "0.5rem",
  },
  select: {
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginTop: "0.5rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Transactions;
