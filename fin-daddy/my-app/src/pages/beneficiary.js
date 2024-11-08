import React, { useState, useEffect } from "react";
import axios from "axios";

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [formData, setFormData] = useState({
    customerId: "",
    accountId: "",
    description: "",
    bankId: "",
  });

  // Fetch beneficiaries when the component mounts
  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      const response = await axios.get("https://<your-api-endpoint>/beneficiaries");
      setBeneficiaries(response.data);
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);

    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Add a new beneficiary
  const handleAddBeneficiary = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://<your-api-endpoint>/beneficiaries", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Beneficiary added successfully!");
      fetchBeneficiaries(); // Refresh the list
      setFormData({ customerId: "", accountId: "", description: "", bankId: "" }); // Reset form
    } catch (error) {
      console.error("Error adding beneficiary:", error);
      alert("Failed to add beneficiary.");
    }
  };

  // Remove a beneficiary
  const handleRemoveBeneficiary = async (beneficiaryId) => {
    try {
      await axios.delete(`https://<your-api-endpoint>/beneficiaries/${beneficiaryId}`);
      alert("Beneficiary removed successfully!");
      fetchBeneficiaries(); // Refresh the list
    } catch (error) {
      console.error("Error removing beneficiary:", error);
      alert("Failed to remove beneficiary.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.beneficiaryList}>
        <h2>Beneficiaries</h2>
        {beneficiaries.length === 0 ? (
          <p>No beneficiaries found.</p>
        ) : (
          <ul>
            {beneficiaries.map((beneficiary) => (
              <li key={beneficiary.id} style={styles.beneficiaryItem}>
                <span>{beneficiary.description} (Account ID: {beneficiary.accountId})</span>
                <button
                  style={styles.removeButton}
                  onClick={() => handleRemoveBeneficiary(beneficiary.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={styles.formContainer}>
        <h2>Add Beneficiary</h2>
        <form onSubmit={handleAddBeneficiary} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Customer ID:</label>
            <input
              type="text"
              name="customerId"
              value={formData.customerId}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Account ID:</label>
            <input
              type="text"
              name="accountId"
              value={formData.accountId}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Bank ID:</label>
            <input
              type="number"
              name="bankId"
              value={formData.bankId}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.addButton}>Add Beneficiary</button>
        </form>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "space-around",
    padding: "2rem",
  },
  beneficiaryList: {
    width: "45%",
    padding: "1rem",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  beneficiaryItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 0",
    borderBottom: "1px solid #eee",
  },
  removeButton: {
    padding: "0.25rem 0.5rem",
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  formContainer: {
    width: "45%",
    padding: "1rem",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginTop: "0.25rem",
  },
  addButton: {
    padding: "0.75rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Beneficiaries;
