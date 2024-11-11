import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import "./style.css";
import "./Redeem.css";

const offers = [
  { id: 1, name: "Hotel Stay", cost: 300 },
  { id: 2, name: "Flight Upgrade", cost: 500 },
  { id: 3, name: "Car Rental Discount", cost: 200 },
];

const MilesRedemption = () => {
  const user = useSelector(selectUser);
  const [miles, setMiles] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);
  const [redeemedOffer, setRedeemedOffer] = useState(null);
  const [convertedTransactionIds, setConvertedTransactionIds] = useState(
    JSON.parse(localStorage.getItem("convertedTransactionIds")) || []
  );

  useEffect(() => {
    const fetchMiles = async () => {
      try {
        const response = await fetch(
          `https://personal-lykkncb1.outsystemscloud.com/MilesCRUD/rest/CustMiles/GetMiles?CustomerId=${user.customerId}`,
          {
            method: "GET",
            headers: {
              "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch miles");
        }

        const data = await response.json();
        setMiles(data[0].MilesAmount);
      } catch (error) {
        console.error("Error fetching miles:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `https://personal-g2wuuy52.outsystemscloud.com/TransactionRoundUp/rest/PaymentToMerchant/GetPayments?CustomerId=${user.customerId}`,
          {
            method: "GET",
            headers: {
              "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchMiles();
    fetchTransactions();
  }, [user.customerId]);

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleConvertToMiles = async () => {
    if (selectedTransaction) {
      try {
        const response = await fetch(
          `https://personal-lykkncb1.outsystemscloud.com/MilesComposite/rest/MilesTransfer/MilesUpdate?Transaction_id=${selectedTransaction.Transaction_ID}`,
          {
            method: "POST",
            headers: {
              "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to convert transaction to miles");
        }
        const data = await response.json();
        setMiles(data.milesAmt);

        // Update local storage with the new converted transaction
        const updatedConvertedTransactionIds = [...convertedTransactionIds, selectedTransaction.Transaction_ID];
        setConvertedTransactionIds(updatedConvertedTransactionIds);
        localStorage.setItem("convertedTransactionIds", JSON.stringify(updatedConvertedTransactionIds));

        setSelectedTransaction(null); // Deselect transaction after conversion
      } catch (error) {
        console.error("Error converting to miles:", error);
      }
    }
  };

  const handleRedeemMiles = async (offer) => {
    if (miles < offer.cost) {
      setError("Not enough miles to redeem");
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch(
        "https://personal-lykkncb1.outsystemscloud.com/MilesCRUD/rest/CustMiles/DeductMiles",
        {
          method: "PUT",
          headers: {
            "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            custId: user.customerId,
            milesAmt: offer.cost,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to redeem miles");
      }

      const data = await response.json();
      setMiles(data.milesAmt);
      setRedeemedOffer(offer);
      setError(null);
      setShowPopup(true);
    } catch (error) {
      console.error("Error redeeming miles:", error);
      setError("Failed to redeem miles");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setError(null);
    setRedeemedOffer(null);
  };

  return (
    <div className="container" style={{ marginTop: "96px" }}>
      <h1 className="header">Miles Redemption</h1>

      <div className="balanceContainer">
        <h3 className="balanceText">Your Miles Balance</h3>
        <p className="miles">{miles} miles</p>
      </div>

      <div className="transactionsContainer">
        <h3 className="sectionHeader">Transaction History</h3>
        <ul className="transactionList">
          {transactions.map((transaction) => (
            <li
              key={transaction.Transaction_ID}
              onClick={() => handleSelectTransaction(transaction)}
              className="transactionItem"
              style={{
                backgroundColor: convertedTransactionIds.includes(transaction.Transaction_ID) 
                  ? "#d8d8d8" 
                  : selectedTransaction?.Transaction_ID === transaction.Transaction_ID 
                  ? "#d8eaf2" 
                  : "#fff",
                pointerEvents: convertedTransactionIds.includes(transaction.Transaction_ID) 
                  ? "none" 
                  : "auto",
              }}
            >
              <div>ID: {transaction.Transaction_ID}</div>
              <div>Amount: $ {transaction.Transaction_Amount}</div>
              <div className="transactionDate">{transaction.Created_At}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="buttonContainer">
        <button onClick={handleConvertToMiles} className="button" disabled={!selectedTransaction}>
          Convert to Miles
        </button>
      </div>
      <div><h3 className="sectionHeader">Redeem Offers Here</h3></div>
      <div className="offersContainer">
        {offers.map((offer) => (
          <div key={offer.id} className="offerCard">
            <h3>{offer.name}</h3>
            <p>Cost: {offer.cost} miles</p>
            <button onClick={() => handleRedeemMiles(offer)} className="button">
              Redeem Miles
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <p>
            {error
              ? error
              : `You have successfully redeemed ${redeemedOffer?.name}. Remaining miles: ${miles}.`}
          </p>
          <button onClick={closePopup} className="closeButton">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MilesRedemption;
