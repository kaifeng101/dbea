import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import "../TransactionHistory.css";

function TransactionHistory() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }, [userID]);

  useEffect(() => {
    if (userID) {
      getAccounts();
    }
  }, [getAccounts, userID]);

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const fetchTransactions = async () => {
    let pageNo = 1;
    let allTransactions = [];
    try {
      while (true) {
        const username = "12173e30ec556fe4a951";
        const password = "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0";
        const basicAuth = "Basic " + btoa(`${username}:${password}`);
        const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/account/${selectedAccount}/transactions?PageNo=${pageNo}&PageSize=10&StartDate=${startDate}&EndDate=${endDate}`;
        const response = await axios.get(url, {
          headers: {
            "Authorization": basicAuth,
            "Content-Type": "application/json",
          },
        });
        
        if (response.data.length === 0) break;
        allTransactions = [...allTransactions, ...response.data];
        pageNo += 1;
      }
      setTransactions(allTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchTransactions();
  };

  return (
    <div style={{fontFamily: "Montserrat, sans-serif", margin:"100px"}}>
      <h1 style={{color: "#44403c",fontSize: "30px"}}>Transaction History</h1>

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label>Select Account:</label>
          <select value={selectedAccount} onChange={handleAccountChange} className="input-field">
            <option value="">--Select Account--</option>
            {bankAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-field"
          />
        </div>

        <button type="submit" className="fetch-btn">Fetch Transactions</button>
      </form>

      {transactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Account From</th>
              <th>Account To</th>
              <th>Amount</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transactionId}>
                <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                <td>{transaction.accountFrom}</td>
                <td>{transaction.accountTo}</td>
                <td>{transaction.transactionAmount}</td>
                <td>{transaction.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-transactions">No transactions found for the selected criteria.</p>
      )}
    </div>
  );
}

export default TransactionHistory;
