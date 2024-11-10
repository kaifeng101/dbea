import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Slider,
  InputAdornment,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import axios from "axios";

const planDetails = {
  1: {
    title: "Green Bonds",
    description:
      "This plan focuses on green bonds, providing a low-risk, stable investment option for conservative investors seeking steady, environmentally friendly returns. Green bonds are issued by governments or corporations specifically to finance eco-friendly projects, such as renewable energy or sustainable agriculture. These bonds offer less volatility and consistent interest payments, making them ideal for those looking for predictable, eco-conscious returns without high risk.",
    riskLevel: "Low",
    expectedReturn: "10% annually",
    rate: 0.008333,
  },
  2: {
    title: "Green Investment Bundle",
    description:
      "The Green Investment Bundle offers balanced risk and return through a mix of green equity funds, high-yield bonds, and impact investment funds. Green equity funds invest in companies focused on sustainability, such as renewable energy and clean technology, and come with moderate risk. High-yield bonds offer higher returns by investing in companies with sustainability initiatives, although they carry greater credit risk. Impact investment funds direct capital to projects with positive social or environmental outcomes, like clean energy or affordable housing. This bundle suits investors looking for moderate growth and a mix of stable and higher-yield investments, all contributing to positive environmental and social impact.",
    riskLevel: "Medium",
    expectedReturn: "15% annually",
    rate: 0.0125,
  },
  3: {
    title: "Leveraged Green Growth Package",
    description:
      "For aggressive investors, the Leveraged Green Growth Package provides high return potential through leveraged green ETFs. These funds use leverage to amplify exposure to green sectors like renewable energy and clean technology, aiming for greater returns by multiplying daily index movements. However, leveraged ETFs are volatile and best suited for short- to medium-term holding periods. This package is ideal for those with a high-risk tolerance, as it uses additional borrowed funds to maximize returns while focusing on environmentally conscious industries. Credit checks may be required for those using margin accounts, as leveraged investments increase the risk of significant loss.",
    riskLevel: "High",
    expectedReturn: "23%+ annually",
    rate: 0.0192,
  },
};

const PlanDetail = () => {
  const { id } = useParams();
  const plan = planDetails[id];
  const user = useSelector(selectUser);
  const customerId = user.customerId;

  const [customerPlans, setCurrentPlans] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [expectedDuration, setExpectedDuration] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [selectedFromAccount, setSelectedFromAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [existingPlan, setExistingPlan] = useState(null);
  const [maxLeverageRate, setMaxLeverageRate] = useState(0);
  const [holdingAmount, setHoldingAmount] = useState("");
  const [leverageRate, setLeverageRate] = useState(0.0);

  useEffect(() => {
    const title = plan.title;
    if (customerPlans) {
      const matchingPlans = customerPlans.filter((plan) => plan.Type === title);

      if (matchingPlans.length > 0) {
        setExistingPlan(matchingPlans[0]);
      }
    }
  }, [customerPlans]);

  const calculateExpectedReturn = () => {
    const principal = parseFloat(investmentAmount);
    if (!principal || !expectedDuration || isNaN(principal)) return;

    const monthlyRate = plan.rate;
    const expectedAmount =
      principal * Math.pow(1 + monthlyRate, expectedDuration);

    setExpectedReturn(expectedAmount.toFixed(2));
  };

  useEffect(() => {
    if (investmentAmount && expectedDuration) {
      calculateExpectedReturn();
    }
  }, [investmentAmount, expectedDuration]);

  const getCustomerCreditScore = async (certificateNo) => {
    try {
      const url = `https://personal-svyrscxo.outsystemscloud.com/CreditScore/rest/CreditScore/GetCreditScore?CertificateNo=${certificateNo}
`;
      const headers = {
        "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d", // Add the API Key here
      };
      const response = await axios.get(url, {
        headers,
      });
      const creditScore = response.data.creditScore;
      let leverage = 1; // Default leverage rate for a good credit score

      if (creditScore >= 300 && creditScore <= 580) {
        leverage = 1.5; // Low Credit Score -> higher leverage rate (riskier)
      } else if (creditScore >= 581 && creditScore <= 670) {
        leverage = 1.25; // Fair Credit Score -> moderate leverage rate
      } else if (creditScore >= 671 && creditScore <= 740) {
        leverage = 1; // Good Credit Score -> baseline leverage rate
      } else if (creditScore >= 741) {
        leverage = 0.75; // Excellent Credit Score -> lower leverage rate (less risky)
      }

      if (expectedDuration <= 6) {
        leverage *= 1.1; // Shorter duration: higher leverage rate
      } else if (expectedDuration > 6 && expectedDuration <= 12) {
        leverage *= 1; // Medium duration: baseline leverage rate
      } else {
        leverage *= 0.9; // Longer duration: lower leverage rate
      }

      if (!isNaN(leverage)) {
        setMaxLeverageRate(leverage);
      }
      setMaxLeverageRate(leverage);
    } catch (error) {
      setCurrentPlans(null);
    }
  };

  useEffect(() => {
    if (plan.id === 3) {
      getCustomerCreditScore(user.certificate);
    }
  }, [plan, user]);

  const calculateHoldingAmount = () => {
    const leverageAmount = maxLeverageRate * parseFloat(investmentAmount);
    setHoldingAmount(leverageAmount);
  };

  useEffect(() => {
    if (investmentAmount && maxLeverageRate >= 0) {
      calculateHoldingAmount();
    }
  }, [investmentAmount, maxLeverageRate]);

  const calculateGrowthAmount = (amount, datetime) => {
    const principal = parseFloat(amount);
    const rate = plan.rate;
    if (!principal || isNaN(principal) || !datetime) return;

    const startDate = new Date(datetime);
    const currentDate = new Date();

    const monthsDifference =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
      currentDate.getMonth() -
      startDate.getMonth();

    // const daysDifference = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const remainingDaysInMonth = daysInMonth - startDate.getDate();

    if (monthsDifference <= 0 && remainingDaysInMonth <= 0) return;

    let growthAmount = principal * Math.pow(1 + rate, monthsDifference);

    if (remainingDaysInMonth > 0) {
      const dailyRate = rate / 30;
      growthAmount *= Math.pow(1 + dailyRate, remainingDaysInMonth);
    }

    return growthAmount.toFixed(2);
  };

  const fetchCustomerPlan = async (customerId) => {
    try {
      const url = `https://personal-elwlcep1.outsystemscloud.com/Investment/rest/Investment/GetInvestments?CustomerId=${customerId}`;
      const headers = {
        "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d", // Add the API Key here
      };
      const response = await axios.get(url, {
        headers,
      });

      //   console.log("Customer Plans: ", response.data);
      setCurrentPlans(response.data);
    } catch (error) {
      setCurrentPlans(null);
    }
  };

  useEffect(() => {
    fetchCustomerPlan(customerId);
  }, [customerId]);

  const handleInvestmentSubmit = async () => {
    try {
      const response = await axios.post(
        `https://personal-elwlcep1.outsystemscloud.com/Investment/rest/Investment/AddInvestment`,
        {
          customerId: customerId,
          type: plan.title,
          amount: parseFloat(investmentAmount),
          maximum_leverage: "",
        },
        {
          headers: {
            "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d", // Add the API Key here
          },
        }
      );

      await fetchCustomerPlan();
      console.log("Successfully added investment: ", response.data);

      return response.data;
    } catch (error) {
      console.error("Error adding investment: ", error);
    }
  };

  const makePayment = async ({
    ConsumerId,
    TransactionId,
    CustomerId,
    accountFrom,
    accountTo,
    transactionAmount,
    // transactionReferenceNumber,
    // narrative,
  }) => {
    const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/payments/BillPayment?ConsumerId=${ConsumerId}&TransactionId=${TransactionId}&CustomerId=${CustomerId}`;
    const data = {
      accountFrom: accountFrom,
      accountTo: accountTo,
      transactionAmount: transactionAmount,
      transactionReferenceNumber: 0,
      narrative : "",
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("Payment successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error making payment:", error.response || error.message);
    }
  };

  useEffect(() => {
    const getCustomerAccounts = async (customerId) => {
      try {
        const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/customer/${customerId}/accounts`;
        const username = "12173e30ec556fe4a951";
        const password =
          "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0";

        const basicAuth = "Basic " + btoa(`${username}:${password}`);
        const response = await axios.get(url, {
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
        });
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching customer accounts: ", error);
      }
    };
    getCustomerAccounts(customerId);
  }, [customerId]);

  useEffect(() => {
    if (maxLeverageRate) {
      setLeverageRate(maxLeverageRate);
    }
  }, [maxLeverageRate]);

  if (!plan) return <Typography variant="h5">Plan not found</Typography>;

  return (
    <Container maxWidth="md" sx={{ marginTop: "40px" }}>
      <Button component={Link} to="/investments" sx={{ mb: 2 }}>
        Back to Investment Plans
      </Button>
      <Card variant="outlined" sx={{ padding: "3px" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {plan.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {plan.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            <strong>Risk Level:</strong> {plan.riskLevel}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Expected Return:</strong> {plan.expectedReturn}
          </Typography>

          {existingPlan !== null ? (
            <div>
              <Typography variant="h6" sx={{ mt: 3 }}>
                Current Investment Details
              </Typography>
              {plan.id === 3 && (
                <TextField
                  label="Holding Amount"
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={holdingAmount}
                  onChange={(e) => setHoldingAmount(e.target.value)}
                />
              )}
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Current Amount:</strong> $
                {calculateGrowthAmount(
                  existingPlan?.Amount,
                  existingPlan?.DateTime
                )}
              </Typography>
              <Typography variant="body1">
                <strong>Earnings:</strong> ${(calculateGrowthAmount(
                  existingPlan?.Amount,
                  existingPlan?.DateTime
                ) - existingPlan.Amount).toFixed(2)}
              </Typography>
              <TextField
                label="Add Funds"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
              />
              <TextField
                select
                label="Account"
                value={selectedFromAccount}
                onChange={(e) => setSelectedFromAccount(e.target.value)}
                required
                fullWidth
                disabled={
                  !investmentAmount || isNaN(parseFloat(investmentAmount))
                }
                sx={{ mt: 2 }}
                SelectProps={{
                  native: true, // Use native select for compatibility
                }}
              >
                <option value="" disabled></option>
                {accounts.length > 0 &&
                  accounts
                    .filter(
                      (account) =>
                        account.balance >= parseFloat(investmentAmount)
                    )
                    .map((account) => (
                      <option key={account.accountId} value={account.accountId}>
                        {account.accountId} (balance: ${account.balance})
                      </option>
                    ))}
              </TextField>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleInvestmentSubmit}
              >
                Add Funds
              </Button>
            </div>
          ) : (
            <form>
              <Typography variant="h6" sx={{ mt: 3 }}>
                Start Investing in This Plan
              </Typography>
              {plan.title === "Leveraged Green Growth Package" && (
                <TextField
                  label="Holding Amount"
                  variant="outlined"
                  required
                  fullWidth
                  sx={{ mb: 2, mt: 1 }}
                  value={holdingAmount}
                  onChange={(e) => setHoldingAmount(e.target.value)}
                />
              )}
              <TextField
                label="Investment Amount"
                variant="outlined"
                fullWidth
                sx={{ mb: 2, mt: 1 }}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ), // Adds a $ sign to the start
                }}
                value={investmentAmount}
                required
              />
              <TextField
                label="Expected Duration (months)"
                variant="outlined"
                fullWidth
                onChange={(e) => setExpectedDuration(e.target.value)}
                value={expectedDuration}
                sx={{ mb: 2 }}
                required
              />
              {plan.title === "Leveraged Green Growth Package" && (
                <>
                  <Slider
                    value={leverageRate}
                    step={0.01}
                    min={0.01} // or some sensible minimum value
                    max={maxLeverageRate || 2} // maxLeverageRate should be set properly
                    onChange={(e, newValue) => setLeverageRate(newValue)}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value.toFixed(2)}`}
                  />

                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Leverage Rate:</strong> {leverageRate}%
                  </Typography>
                </>
              )}
              <TextField
                select
                label="Account"
                value={selectedFromAccount}
                onChange={(e) => setSelectedFromAccount(e.target.value)}
                required
                fullWidth
                disabled={
                  !investmentAmount || isNaN(parseFloat(investmentAmount))
                }
                sx={{ mb: 2 }}
                SelectProps={{
                  native: true, // Use native select for compatibility
                }}
              >
                <option value="" disabled></option>
                {accounts.length > 0 &&
                  accounts
                    .filter(
                      (account) =>
                        account.balance >= parseFloat(investmentAmount)
                    )
                    .map((account) => (
                      <option key={account.accountId} value={account.accountId}>
                        {account.accountId} (balance: ${account.balance})
                      </option>
                    ))}
              </TextField>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Expected Return Amount: ${expectedReturn || "0.00"}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleInvestmentSubmit}
              >
                Start Investment
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default PlanDetail;
