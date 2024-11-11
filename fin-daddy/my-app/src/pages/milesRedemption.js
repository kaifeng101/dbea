
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
// import { useNavigate } from "react-router-dom";
import "./style.css";
import "./Redeem.css";
import { Card, Typography, CardContent, Grid, Button, Icon } from "@mui/material"
import { FlightTakeoff, Hotel, DirectionsCar } from "@mui/icons-material";

const getTransactionIcon = (description) => {
  switch (description) {
    case "Flight Booking":
      return <FlightTakeoff style={{ color: "blue" }} />;
    case "Hotel Booking":
      return <Hotel style={{ color: "green" }} />;
    case "Car Rental":
      return <DirectionsCar style={{ color: "red" }} />;
    default:
      return <Icon />;
  }
};

const getOfferIcon = (name) => {
  switch (name) {
    case "Hotel Stay":
      return <Hotel style={{ color: "green" }} />;
    case "Flight Upgrade":
      return <FlightTakeoff style={{ color: "blue" }} />;
    case "Car Rental Discount":
      return <DirectionsCar style={{ color: "red" }} />;
    default:
      return <Icon />;
  }
};

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
  // const navigate = useNavigate();
  const [miles, setMiles] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);
  const [redeemedOffer, setRedeemedOffer] = useState(null); // New state to track the redeemed offer
console.log(user.customerId)
  useEffect(() => {
    setTransactions(mockTransactions);

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

    fetchMiles();

  }, [user.customerId]);


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
            custId: user.customerId,
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
    <>
    <Grid container spacing={2} style={{ marginTop: '70px', display: 'flex', justifyContent: 'space-between' }}>
  {/* Transaction History Card */}
  <Grid item xs={12} sm={6} md={6}>
    <Card style={{marginLeft: "10px", height: '100%'}}>
      <Typography
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "30px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "10px",
          marginBottom: "16px"
        }}
      >
        Miles Redemption
      </Typography>

      <Card variant="outlined" style={{marginLeft:"15px", marginRight: "15px", padding: "10px", backgroundColor: "#dcfce7"}}>
        <h3 className="balanceText" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Your Miles Balance
        </h3>
        <p className="miles" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {miles} miles
        </p>
      </Card>
      <CardContent>
      <div className="transactionsContainer">
        <h3 className="sectionHeader" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Transaction History
        </h3>
        <ul className="transactionList" style={{ fontFamily: "'Montserrat', sans-serif" }}>
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
              <Grid item>{getTransactionIcon(transaction.description)}</Grid>
              <div>{transaction.description}</div>
              <div>{transaction.points} points</div>
              <div className="transactionDate">{transaction.date}</div>
            </li>
          ))}
        </ul>
      </div>

        <Button
          onClick={handleConvertToMiles}
          style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#44403c", color:'white' }}
          disabled={!selectedTransaction}
          fullWidth
        >
          Convert to Miles
        </Button>
      </CardContent>
    </Card>
  </Grid>

  {/* Redeem Offers Card */}
  <Grid item xs={12} sm={6} md={6}>
    <Card style={{ height: '100%', marginRight: "10px" }}>
      <div>
        <Typography  style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "30px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "10px",
        }}>
          Redeem Offers Here
        </Typography>
      </div>
      <CardContent style={{ fontFamily: "'Montserrat', sans-serif" }}>
        {offers.map((offer) => (
          <Card variant="outlined" key={offer.id} style={{marginBottom: "10px", backgroundColor: "#dcfce7"}}>
            <CardContent  style={{display: 'flex',
            justifyContent: 'space-between'}}>
            <Grid item>{getOfferIcon(offer.name)}</Grid>
            <h3 style={{fontWeight: 'bold'}}>{offer.name}</h3>
            <p>Cost: {offer.cost} miles</p>
            <Button size="small" onClick={() => handleRedeemMiles(offer)} style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#44403c", color:'white' }}>
              Redeem Miles
            </Button>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  </Grid>
</Grid>
      
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
  </>
  );
};

export default MilesRedemption;
