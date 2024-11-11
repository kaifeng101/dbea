import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import "./style.css";
import "./Redeem.css";
import { Card, Typography, CardContent, Grid, Button, Checkbox, FormControlLabel, Icon } from "@mui/material";
import { FlightTakeoff, Hotel, DirectionsCar } from "@mui/icons-material";


const offers = [
  { id: 1, name: "Hotel Stay", cost: 300 },
  { id: 2, name: "Flight Upgrade", cost: 500 },
  { id: 3, name: "Car Rental Discount", cost: 200 },
];

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

const MilesRedemption = () => {
  const user = useSelector(selectUser);
  const [miles, setMiles] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);
  const [redeemedOffer, setRedeemedOffer] = useState(null);
  const [convertedTransactionIds, setConvertedTransactionIds] = useState(
    JSON.parse(localStorage.getItem("convertedTransactionIds")) || []
  );
  const [selectAll, setSelectAll] = useState(false);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    };
    return new Date(dateString).toLocaleString('en-GB', options).replace(",", "");
  };

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

        if (!response.ok) throw new Error("Failed to fetch miles");
        
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

        if (!response.ok) throw new Error("Failed to fetch transactions");
        
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchMiles();
    fetchTransactions();
  }, [user.customerId]);

  const handleSelectTransaction = (transactionId) => {
    if (selectedTransactions.includes(transactionId)) {
      setSelectedTransactions(selectedTransactions.filter((id) => id !== transactionId));
    } else {
      setSelectedTransactions([...selectedTransactions, transactionId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTransactions([]);
    } else {
      const selectableTransactions = transactions
        .filter((transaction) => !convertedTransactionIds.includes(transaction.Transaction_ID))
        .map((transaction) => transaction.Transaction_ID);
      setSelectedTransactions(selectableTransactions);
    }
    setSelectAll(!selectAll);
  };

  const handleConvertToMiles = async () => {
    const selectedTransactionsData = transactions.filter((transaction) =>
      selectedTransactions.includes(transaction.Transaction_ID)
    );

    const totalAmount = selectedTransactionsData.reduce(
      (sum, transaction) => sum + transaction.Transaction_Amount,
      0
    );

    try {
      const response = await fetch(
        "https://personal-lykkncb1.outsystemscloud.com/MilesCRUD/rest/CustMiles/UpdateMiles",
        {
          method: "PUT",
          headers: {
            "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            custId: user.customerId,
            milesAmt: totalAmount/0.015,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to convert transaction to miles");

      const data = await response.json();
      setMiles(data.milesAmt);

      const updatedConvertedTransactionIds = [
        ...convertedTransactionIds,
        ...selectedTransactions,
      ];
      setConvertedTransactionIds(updatedConvertedTransactionIds);
      localStorage.setItem("convertedTransactionIds", JSON.stringify(updatedConvertedTransactionIds));

      setSelectedTransactions([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error converting to miles:", error);
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
    <>
      <Grid container spacing={2} style={{ marginTop: '70px', display: 'flex', justifyContent: 'space-between' }}>
        <Grid item xs={12} sm={6} md={6}>
          <Card style={{ marginLeft: "10px", height: '100%' }}>
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
            <Card variant="outlined" style={{ marginLeft: "15px", marginRight: "15px", padding: "10px", backgroundColor: "#dcfce7" }}>
              <h3 className="balanceText" style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Miles Balance</h3>
              <p className="miles" style={{ fontFamily: "'Montserrat', sans-serif" }}>{Number(miles).toFixed(2)} miles</p>
            </Card>
            <CardContent>
              <div className="transactionsContainer">
                <h3 className="sectionHeader" style={{ fontFamily: "'Montserrat', sans-serif" }}>Transaction History</h3>
                <FormControlLabel
                  control={<Checkbox checked={selectAll} onChange={handleSelectAll} />}
                  label="Select All" sx={{
                    '& .MuiTypography-root': {fontFamily: 'Montserrat, sans-serif'}
                  }}
                />
                <ul className="transactionList" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {transactions.map((transaction) => (
                    <li
                      key={transaction.Transaction_ID}
                      className="transactionItem"
                      style={{
                        backgroundColor: convertedTransactionIds.includes(transaction.Transaction_ID)
                          ? "#d8d8d8"
                          : selectedTransactions.includes(transaction.Transaction_ID)
                          ? "#d8eaf2"
                          : "#fff",
                        pointerEvents: convertedTransactionIds.includes(transaction.Transaction_ID) ? "none" : "auto",
                      }}
                    >
                      <Checkbox
                        checked={selectedTransactions.includes(transaction.Transaction_ID)}
                        onChange={() => handleSelectTransaction(transaction.Transaction_ID)}
                        disabled={convertedTransactionIds.includes(transaction.Transaction_ID)}
                      />
                      <div>ID: {transaction.Transaction_ID}</div>
                      <div>Amount: $ {transaction.Transaction_Amount}</div>
                      <div className="transactionDate">{formatDate(transaction.Created_At)}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                onClick={handleConvertToMiles}
                style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#44403c", color: 'white' }}
                disabled={selectedTransactions.length === 0}
                fullWidth
              >
                Convert to Miles
              </Button>
            </CardContent>
          </Card>
        </Grid>
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
            <Grid item>{getOfferIcon(offer.name)}  {offer.name}</Grid>
            <Grid>Cost: {offer.cost} miles</Grid>
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
          <p>{error ? error : `You have successfully redeemed ${redeemedOffer?.name}. Remaining miles: ${miles}.`}</p>
          <button onClick={closePopup} className="closeButton">Close</button>
        </div>
      )}
    </>
  );
};

export default MilesRedemption;
