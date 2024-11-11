import React, { useEffect, useState, useCallback } from "react";
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
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import axios from "axios";

const lowRiskData = [
  { year: "2019", risk: 1, return: 8 },
  { year: "2020", risk: 1.5, return: 10 },
  { year: "2021", risk: 2, return: 11 },
  { year: "2022", risk: 2.2, return: 9 },
  { year: "2023", risk: 2.5, return: 6 },
];

const mediumRiskData = [
  { year: "2019", risk: 5, return: 13 },
  { year: "2020", risk: 5.5, return: 12 },
  { year: "2021", risk: 6, return: 11 },
  { year: "2022", risk: 6.5, return: 16 },
  { year: "2023", risk: 7, return: 9 },
];

const highRiskData = [
  { year: "2019", risk: 10, return: 20 },
  { year: "2020", risk: 11, return: 26 },
  { year: "2021", risk: 12, return: 17 },
  { year: "2022", risk: 13, return: 20 },
  { year: "2023", risk: 15, return: 21 },
];

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

const getLowRiskChart = () => {
  return (
    <div style={{ flex: "1 1 48%" }}>
      <Card variant="outlined">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            marginRight: "20px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Basic Plan - Green Bonds
        </Typography>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lowRiskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#2c7a7b"
                strokeWidth={3}
                name="Risk (%)"
              />
              <Line
                type="monotone"
                dataKey="return"
                stroke="#2b6cb0"
                strokeWidth={3}
                name="Return (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

const getMediumRiskChart = () => {
  return (
    <div style={{ flex: "1 1 48%" }}>
      <Card variant="outlined">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            marginRight: "20px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Intermediate Plan - Green Investment Bundle
        </Typography>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mediumRiskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#2c7a7b"
                strokeWidth={3}
                name="Risk (%)"
              />
              <Line
                type="monotone"
                dataKey="return"
                stroke="#2b6cb0"
                strokeWidth={3}
                name="Return (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
const getHighRiskChart = () => {
  return (
    <div style={{ flex: "1 1 48%" }}>
      <Card variant="outlined" sx={{ padding: "3px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            marginRight: "20px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Expert Plan - Leveraged Green Growth Package
        </Typography>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={highRiskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#2c7a7b"
                strokeWidth={3}
                name="Risk (%)"
              />
              <Line
                type="monotone"
                dataKey="return"
                stroke="#2b6cb0"
                strokeWidth={3}
                name="Return (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

const PlanDetail = () => {
  const { id } = useParams();
  const plan = planDetails[id];
  const user = useSelector(selectUser);
  const customerId = user.customerId;

  const [customerPlans, setCurrentPlans] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [selectedFromAccount, setSelectedFromAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [existingPlan, setExistingPlan] = useState(null);
  const [maxLeverageRate, setMaxLeverageRate] = useState(1);
  const [holdingAmount, setHoldingAmount] = useState("");
  const [leverageRate, setLeverageRate] = useState(1);
  const [withdrawAmount, setWithdrawAmount] = useState(0.0);
  const [selectedWithdrawAccount, setSelectedWithdrawAccount] = useState("");

  useEffect(() => {
    if (!plan?.title || !customerPlans) return; // Early return if plan title or customerPlans is not available

    const title = plan.title;
    const matchingPlans = customerPlans
      .filter((customerPlan) => customerPlan.Type === title)
      .sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime)); // Sort by DateTime in descending order

    if (matchingPlans.length > 0) {
      let totalAmount = 0;
      let maxLeverage = 0;

      matchingPlans.forEach((matchingPlan) => {
        const growthAmount = calculateGrowthAmount(
          matchingPlan.Amount,
          matchingPlan.DateTime
        );
        if (growthAmount) totalAmount += parseFloat(growthAmount); // Add growth amount
        if (matchingPlan.maximum_leverage)
          maxLeverage += parseFloat(matchingPlan.maximum_leverage);
      });

      const latestPlan = matchingPlans[matchingPlans.length - 1];
      const accountObject = {
        Amount: totalAmount.toFixed(2), // Total amount with 2 decimals
        Type: title,
        DateTime: latestPlan.DateTime,
        maximum_leverage: maxLeverage.toFixed(2), // Sum of all leverage values
      };

      setExistingPlan(accountObject); // Update the state with the account details
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerPlans, plan?.title, investmentAmount]);

  const calculateGrowthAmount = (amount, datetime) => {
    const principal = parseFloat(amount);
    const rate = plan.rate;

    if (isNaN(principal) || !datetime || !rate) return;

    const startDate = new Date(datetime);
    const currentDate = new Date();

    // Calculate full months difference
    const monthsDifference =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
      currentDate.getMonth() -
      startDate.getMonth();

    if (monthsDifference <= 0) return; // Return early if the date is invalid

    // Calculate remaining days in the current month, if applicable
    const remainingDaysInMonth = Math.max(
      0,
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate() - startDate.getDate()
    );

    // Calculate growth amount for full months
    let growthAmount = principal * Math.pow(1 + rate, monthsDifference);

    // Adjust for remaining days using a daily rate
    if (remainingDaysInMonth > 0) {
      const dailyRate = rate / 30; // Assume 30 days in a month for daily rate calculation
      growthAmount *= Math.pow(1 + dailyRate, remainingDaysInMonth);
    }

    return isNaN(growthAmount) ? null : growthAmount.toFixed(2);
  };
  const withdrawInvestment = async (amount) => {
    try {
      const initialAmount = existingPlan.Amount;
      const newAmount = initialAmount - amount;
      if (newAmount < 0) {
        alert(
          "You can only withdraw an amount less than or equal to the current amount."
        );
        setWithdrawAmount(0);
        return;
      }
      await axios.post(
        `https://personal-elwlcep1.outsystemscloud.com/Investment/rest/Investment/AddInvestment`,
        {
          customerId: customerId,
          type: plan.title,
          amount: -amount,
          maximum_leverage: existingPlan.maximum_leverage,
        },
        {
          headers: {
            "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d", // Add the API Key here
          },
        }
      );
      await fetchCustomerPlan(customerId);

      const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/account/${customerId}/DepositCash
`;
      const content = {
        consumerId: customerId,
        transactionId: 1,
        accountId: selectedWithdrawAccount,
        amount: withdrawAmount,
        narrative: "string",
      };

      const username = "12173e30ec556fe4a951";
      const password =
        "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0";

      const basicAuth = "Basic " + btoa(`${username}:${password}`);
      await axios.put(url, content, {
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
      });
      setWithdrawAmount(0);
      setSelectedWithdrawAccount("");
      return;
    } catch (error) {
      console.error("Error Withdrawing Investment: ", error);
    }
  };

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
      const creditScore = response.data.CreditScore;
      let leverage = 1;

      if (creditScore >= 300 && creditScore <= 580) {
        leverage = 10;
      } else if (creditScore >= 581 && creditScore <= 670) {
        leverage = 20;
      } else if (creditScore >= 671 && creditScore <= 740) {
        leverage = 35;
      } else if (creditScore >= 741) {
        leverage = 50;
      }

      setMaxLeverageRate(leverage);
    } catch (error) {
      setMaxLeverageRate(2);
    }
  };

  useEffect(() => {
    if (plan.title === "Leveraged Green Growth Package") {
      getCustomerCreditScore(user.certificate);
    }
  }, [plan, user]);

  const fetchCustomerPlan = async (customerId) => {
    try {
      const url = `https://personal-elwlcep1.outsystemscloud.com/Investment/rest/Investment/GetInvestments?CustomerId=${customerId}`;
      const headers = {
        "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d", // Add the API Key here
      };
      const response = await axios.get(url, {
        headers,
      });

      setCurrentPlans(response.data);
    } catch (error) {
      setCurrentPlans(null);
    }
  };

  useEffect(() => {
    fetchCustomerPlan(customerId);
  }, [customerId]);

  const makePayment = async (amount) => {
    try {
      const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/account/${customerId}/WithdrawCash`;
      const content = {
        consumerId: customerId,
        transactionId: "-",
        accountId: selectedFromAccount,
        amount: amount,
        narrative: "-",
      };
      const username = "12173e30ec556fe4a951";
      const password =
        "2fbbd75fd60a8389b82719d2dbc37f1eb9ed226f3eb43cfa7d9240c72fd5+bfc89ad4-c17f-4fe9-82c2-918d29d59fe0";

      const basicAuth = "Basic " + btoa(`${username}:${password}`);
      const response = await axios.put(url, content, {
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
      });

      console.log("Payment successful:", response.data);
      return true;
    } catch (error) {
      console.error("Error making payment:", error.response || error.message);
      return false;
    }
  };

  const handleInvestmentSubmit = async (amount) => {
    try {
      let amtToPay = amount + amount * 0.025;

      if (plan.title === "Leveraged Green Growth Package") {
        amtToPay *= leverageRate;
      }
      const pay = await makePayment(amtToPay);
      if (!pay) {
        return;
      }

      let maximumLeverageAmount = "";
      if (plan.title === "Leveraged Green Growth Package") {
        maximumLeverageAmount = holdingAmount;
      }
      if (existingPlan) {
        amtToPay = amount;
        //  +  calculateGrowthAmount(previousPlan?.Amount, previousPlan?.DateTime);
      }

      await axios.post(
        `https://personal-elwlcep1.outsystemscloud.com/Investment/rest/Investment/AddInvestment`,
        {
          customerId: customerId,
          type: plan.title,
          amount: amtToPay,
          maximum_leverage: maximumLeverageAmount,
        },
        {
          headers: {
            "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d", // Add the API Key here
            "Content-Type": "application/json",
          },
        }
      );
      setInvestmentAmount("");
      setSelectedFromAccount("");
      setSelectedWithdrawAccount("");
    } catch (error) {
      console.error("Error adding investment: ", error);
    }
  };

  const getCustomerAccounts = useCallback(async () => {
    try {
      const getAccountsId = `https://personal-svyrscxo.outsystemscloud.com/AccountRegistration/rest/AccountType/GetAccountType?customerId=${user.customerId}`;
      const response1 = await axios.get(getAccountsId, {
        headers: {
          "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d", // API Key
        },
      });

      // Handle case where response is empty or malformed
      if (!response1.data) {
        console.error("Error: No data returned from GetAccountType API.");
        return;
      }

      const { accountId: depositId, savingaccountId: savingsId } =
        response1.data;

      // Handle missing IDs
      if (!depositId || !savingsId) {
        console.error("Error: Missing account IDs in response.");
        return;
      }

      const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/customer/${user.customerId}/accounts`;
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

      // Ensure accounts are found
      const depositAccount = response.data.find(
        (account) => account?.accountId === depositId
      );
      const savingsAccount = response.data.find(
        (account) => account?.accountId === savingsId
      );

      if (!depositAccount || !savingsAccount) {
        console.error("Error: One or more accounts not found.");
        return;
      }

      setAccounts([depositAccount, savingsAccount]);
    } catch (error) {
      console.error("Error fetching customer accounts: ", error);
    }
  }, [user.customerId]);
  useEffect(() => {
    getCustomerAccounts();
  }, [getCustomerAccounts]);

  useEffect(() => {
    if (maxLeverageRate) {
      setLeverageRate(maxLeverageRate);
    }
  }, [maxLeverageRate]);

  if (!plan)
    return (
      <Typography variant="h5" style={{ fontFamily: "Montserrat, sans-serif" }}>
        Plan not found
      </Typography>
    );

  return (
    <Container sx={{ marginTop: "100px" }} className="flex flex-col  gap-3 ">
      {/* Investment Plan Card */}
      <Card
        variant="outlined"
        sx={{ padding: "3px", flexBasis: { xs: "100%" } }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {plan.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {plan.description}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mt: 2 }}
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <strong>Risk Level:</strong> {plan.riskLevel}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <strong>Expected Return:</strong> {plan.expectedReturn}
          </Typography>
        </CardContent>
      </Card>
      <div className="flex gap-3 md:flex-row flex-col w-full">
        <div className="md:w-3/5">
          {plan.title === "Green Bonds" && getLowRiskChart()}
          {plan.title === "Green Investment Bundle" && getMediumRiskChart()}
          {plan.title === "Leveraged Green Growth Package" &&
            getHighRiskChart()}
        </div>

        {/* Investment Form Section */}
        <div className="md:w-2/5">
          {existingPlan !== null ? (
            <Card sx={{}} variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Current Investment Details
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 1 }}
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  <strong>Current Amount:</strong> $ {existingPlan.Amount}
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  <strong>Earnings:</strong> $
                  {(
                    calculateGrowthAmount(
                      existingPlan?.Amount,
                      existingPlan?.DateTime
                    ) - existingPlan.Amount
                  ).toFixed(2) || 0}
                </Typography>
                {plan.title === "Leveraged Green Growth Package" && (
                  <Typography
                    variant="body1"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    <strong>Current Holding Amount:</strong> $
                    {existingPlan?.maximum_leverage || existingPlan.Amount}
                  </Typography>
                )}
                <TextField
                  label="Add Investment Amount"
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 2,
                    "& .MuiFormLabel-root": {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    "& .MuiInputBase-root": {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                  }}
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
                  sx={{
                    mt: 2,
                    "& .MuiFormLabel-root": {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    "& .MuiInputBase-root": {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                  }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="" disabled></option>
                  <option
                    key={accounts[0]?.accountId}
                    value={accounts[0]?.accountId}
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Deposit Account: {accounts[0]?.accountId} (balance: $
                    {accounts[0]?.balance})
                  </option>
                  <option
                    key={accounts[1]?.accountId}
                    value={accounts[1]?.accountId}
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Savings Account: {accounts[1]?.accountId} (balance: $
                    {accounts[1]?.balance})
                  </option>
                </TextField>
                {plan.title === "Leveraged Green Growth Package" && (
                  <TextField
                    label="Holding Amount"
                    variant="outlined"
                    disabled
                    fullWidth
                    sx={{
                      mt: 2,
                      "& .MuiFormLabel-root": {
                        fontFamily: "'Montserrat', sans-serif",
                      },
                      "& .MuiInputBase-root": {
                        fontFamily: "'Montserrat', sans-serif",
                      },
                    }}
                    value={existingPlan.maximum_leverage}
                  />
                )}
                {investmentAmount !== "" && (
                  <div style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Transaction fee: {(investmentAmount * 0.025).toFixed(2)}
                  </div>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, backgroundColor: "#44403c", color: "white" }}
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  onClick={() => handleInvestmentSubmit(investmentAmount)}
                >
                  Add Funds
                </Button>

                <hr className="bg-black border-1 border my-4" />
                <TextField
                  label="Withdraw Amount"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => {
                    setWithdrawAmount(e.target.value);
                  }}
                  sx={{
                    mt: 2,
                    "& .MuiFormLabel-root": {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    "& .MuiInputBase-root": {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                  }}
                  inputProps={{
                    max: calculateGrowthAmount(
                      existingPlan?.Amount,
                      existingPlan?.DateTime
                    ),
                  }}
                />
                <TextField
                  select
                  label="Account To"
                  value={selectedWithdrawAccount}
                  onChange={(e) => setSelectedWithdrawAccount(e.target.value)}
                  required
                  fullWidth
                  disabled={
                    !withdrawAmount || isNaN(parseFloat(withdrawAmount))
                  }
                  sx={{
                    mt: 2,
                    "& .MuiFormLabel-root": {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    "& .MuiInputBase-root": {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                  }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="" disabled></option>
                  <option
                    key={accounts[0]?.accountId}
                    value={accounts[0]?.accountId}
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Deposit Account: {accounts[0]?.accountId} (balance: $
                    {accounts[0]?.balance})
                  </option>
                  <option
                    key={accounts[1]?.accountId}
                    value={accounts[1]?.accountId}
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Savings Account: {accounts[1]?.accountId} (balance: $
                    {accounts[1]?.balance})
                  </option>
                </TextField>

                {withdrawAmount !== 0 && (
                  <div style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Transaction fee: {(withdrawAmount * 0.025).toFixed(2)}
                  </div>
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2, backgroundColor: "16a34a", color: "white" }}
                  onClick={() =>
                    withdrawInvestment(withdrawAmount - withdrawAmount * 0.025)
                  }
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Withdraw Funds
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ padding: "3px" }} variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Start Investing in This Plan
                </Typography>

                <TextField
                  label="Investment Amount"
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 2,
                    "& .MuiFormLabel-root": {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    "& .MuiInputBase-root": {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                  }}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={investmentAmount}
                  required
                />
                {plan.title === "Leveraged Green Growth Package" && (
                  <>
                    <Slider
                      value={leverageRate}
                      step={1}
                      min={1}
                      max={maxLeverageRate || 50}
                      onChange={(e, newValue) => setLeverageRate(newValue)}
                      valueLabelDisplay="auto"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ mb: 2 }}
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      <strong>Leverage Rate:</strong> {leverageRate}x
                    </Typography>
                  </>
                )}
                {plan.title !== "Leveraged Green Growth Package" && (
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
                    sx={{
                      mt: 2,
                      "& .MuiFormLabel-root": {
                        fontFamily: "'Montserrat', sans-serif",
                      },
                      "& .MuiInputBase-root": {
                        fontFamily: "'Montserrat', sans-serif",
                      },
                    }}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="" disabled></option>
                    <option
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                      key={accounts[0]?.accountId}
                      value={accounts[0]?.accountId}
                    >
                      Deposit Account: {accounts[0]?.accountId} (balance: $
                      {accounts[0]?.balance})
                    </option>
                    <option
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                      key={accounts[1]?.accountId}
                      value={accounts[1]?.accountId}
                    >
                      Savings Account: {accounts[1]?.accountId} (balance: $
                      {accounts[1]?.balance})
                    </option>
                  </TextField>
                )}

                {plan.title === "Leveraged Green Growth Package" && (
                  <>
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
                      sx={{
                        mt: 2,
                        "& .MuiFormLabel-root": {
                          fontFamily: "'Montserrat', sans-serif",
                        },
                        "& .MuiInputBase-root": {
                          fontFamily: "'Montserrat', sans-serif",
                        },
                      }}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="" disabled></option>
                      <option
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                        key={accounts[0]?.accountId}
                        value={accounts[0]?.accountId}
                      >
                        Deposit Account: {accounts[0]?.accountId} (balance: $
                        {accounts[0]?.balance})
                      </option>
                      <option
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                        key={accounts[1]?.accountId}
                        value={accounts[1]?.accountId}
                      >
                        Savings Account: {accounts[1]?.accountId} (balance: $
                        {accounts[1]?.balance})
                      </option>
                    </TextField>
                    <TextField
                      label="Holding Amount"
                      variant="outlined"
                      disabled
                      fullWidth
                      sx={{
                        mt: 2,
                        "& .MuiFormLabel-root": {
                          fontFamily: "'Montserrat', sans-serif",
                        },
                        "& .MuiInputBase-root": {
                          fontFamily: "'Montserrat', sans-serif",
                        },
                      }}
                      value={investmentAmount * leverageRate}
                      onChange={(e) => setHoldingAmount(e.target.value)}
                    />
                  </>
                )}

                {investmentAmount !== "" && (
                  <div style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Transaction fee: {(investmentAmount * 0.025).toFixed(2)}
                  </div>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, backgroundColor: "#44403c", color: "white" }}
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  onClick={() => handleInvestmentSubmit(investmentAmount)}
                >
                  Start Investment
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PlanDetail;
