import React, { useState } from "react";

function Termination() {
  // Dummy data for bank accounts
  const bankAccounts = [
    { id: 1, name: "Account 1 - XXXX1234" },
    { id: 2, name: "Account 2 - XXXX5678" },
    { id: 3, name: "Account 3 - XXXX9101" },
  ];

  // Dummy data for standing instructions
  const standingInstructions = [
    { id: 1, payee: "Electricity Company", frequency: "Monthly", nextPaymentDate: "2024-12-01", lastPayment: "2024-11-01" },
    { id: 2, payee: "Internet Provider", frequency: "Quarterly", nextPaymentDate: "2024-01-15", lastPayment: "2023-10-15" },
    { id: 3, payee: "Gym Membership", frequency: "Yearly", nextPaymentDate: "2025-01-01", lastPayment: "2024-01-01" },
  ];

  const [selectedAccount, setSelectedAccount] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [instructions, setInstructions] = useState(standingInstructions);

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowTable(true);
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to terminate this payment?")) {
      // In a real app, you would make an API call here to delete the payee
      // For this example, we update the state to remove the selected item
      const updatedInstructions = instructions.filter(instruction => instruction.id !== id);
      setInstructions(updatedInstructions);
      alert("Payment terminated successfully.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4a90e2" }}>I want to terminate payment for:</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
        <label htmlFor="accountSelect" style={{ fontWeight: "bold", marginBottom: "5px" }}>Select an account:</label>
        
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

      {showTable && (
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ color: "#4a90e2", marginBottom: "20px" }}>I want to terminate payment for: {selectedAccount}</h2>

          <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <thead>
              <tr style={{ backgroundColor: "#4a90e2", color: "#fff", textAlign: "left" }}>
                <th style={{ padding: "10px" }}>Payee/References</th>
                <th style={{ padding: "10px" }}>Frequency</th>
                <th style={{ padding: "10px" }}>Next Payment Date</th>
                <th style={{ padding: "10px" }}>Last Payment</th>
                <th style={{ padding: "10px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructions.map((instruction) => (
                <tr key={instruction.id} style={{ backgroundColor: "#f9f9f9" }}>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{instruction.payee}</td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{instruction.frequency}</td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{instruction.nextPaymentDate}</td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{instruction.lastPayment}</td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    <button
                      onClick={() => handleRemove(instruction.id)}
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
