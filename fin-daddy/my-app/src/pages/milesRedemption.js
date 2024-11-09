import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "./Redeem.css";

const mockTransactions = [
  { id: 1, description: "Flight Booking", points: 500, date: "2024-10-15" },
  { id: 2, description: "Hotel Booking", points: 300, date: "2024-10-10" },
  { id: 3, description: "Car Rental", points: 200, date: "2024-09-25" },
];

const offers = [
  { id: 1, name: "Hotel Stay", cost: 300 },
  { id: 2, name: "Flight Upgrade", cost: 500 },
  { id: 3, name: "Car Rental Discount", cost: 200 },
];

const MilesRedemption = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [miles, setMiles] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);
  const [redeemedOffer, setRedeemedOffer] = useState(null); // New state to track the redeemed offer

  useEffect(() => {
    setTransactions(mockTransactions);

    const fetchMiles = async () => {
      try {
        const response = await fetch(
          `https://personal-lykkncb1.outsystemscloud.com/MilesCRUD/rest/CustMiles/GetMiles?CustomerId=ABC`,
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

    fetchMiles();
  }, []);

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleConvertToMiles = () => {
    if (selectedTransaction) {
      setMiles((prevMiles) => prevMiles + selectedTransaction.points);
      setSelectedTransaction(null);
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
            custId: "ABC",
            milesAmt: offer.cost,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to redeem miles");
      }

      const data = await response.json();
      setMiles(data.milesAmt); // Update miles based on API response
      setRedeemedOffer(offer); // Store the redeemed offer details
      setError(null); // Clear any previous error
      setShowPopup(true); // Show popup with remaining miles
    } catch (error) {
      console.error("Error redeeming miles:", error);
      setError("Failed to redeem miles");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setError(null);
    setRedeemedOffer(null); // Clear the redeemed offer
  };

  return (
    <div className="container">
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
              key={transaction.id}
              onClick={() => handleSelectTransaction(transaction)}
              className="transactionItem"
              style={{
                backgroundColor:
                  selectedTransaction?.id === transaction.id ? "#d8eaf2" : "#fff",
              }}
            >
              <div>{transaction.description}</div>
              <div>{transaction.points} points</div>
              <div className="transactionDate">{transaction.date}</div>
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
