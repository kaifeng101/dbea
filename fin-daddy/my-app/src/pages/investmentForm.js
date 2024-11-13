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
  Snackbar,
  Alert,
} from "@mui/material";
import {
  getLowRiskChart,
  getMediumRiskChart,
  getHighRiskChart,
} from "./InvestmentChart";
import InfoIcon from "@mui/icons-material/Info";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import axios from "axios";
import InvestmentPlanTable from "./InvestmentHistory";

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

const InvestmentDetails = () => {
  const { id } = useParams();
  const plan = planDetails[id];
  const user = useSelector(selectUser);
  const customerId = user.customerId;

  const [investmentAmount, setInvestmentAmount] = useState(0.0);
  const [selectedFromAccount, setSelectedFromAccount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(0.0);
  const [selectedWithdrawAccount, setSelectedWithdrawAccount] = useState("");

  const [investmentPlans, setInvestmentPlans] = useState([]);
  const [depositAccount, setDepositAccount] = useState([]);
  const [savingsAccount, setSavingsAccount] = useState([]);
  const [maxLeverageRate, setMaxLeverageRate] = useState(1);

  const [currentPlan, setCurrentPlan] = useState([]);
  const [leverageRate, setLeverageRate] = useState(1);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const calculateEarnings = (amount) => {
    let totalEarnings = 0;

    investmentPlans.forEach((plan) => {
      const investDate = new Date(plan.DateTime);
      const current = new Date();

      // Calculate the difference in months between the invest date and current date
      const monthsDifference =
        (current.getFullYear() - investDate.getFullYear()) * 12 +
        (current.getMonth() - investDate.getMonth());

      // Calculate earnings using compound interest formula: A = P * (1 + r)^n
      const earnings =
        amount * Math.pow(1 + plan.rate, monthsDifference) - amount;
      totalEarnings += earnings;
    });

    return totalEarnings;
  };

  const getCustomerAccounts = async (customerId) => {
    try {
      const getAccountsId = `https://personal-svyrscxo.outsystemscloud.com/AccountRegistration/rest/AccountType/GetAccountType?customerId=${customerId}`;
      const response1 = await axios.get(getAccountsId, {
        headers: {
          "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d",
        },
      });

      if (!response1.data) {
        console.error("Error: No data returned from GetAccountType API.");
        setSnackbar({
          open: true,
          message:
            "Customer has no accounts. Please create one before continuing.",
          severity: "error",
        });
        return;
      } else if (!response1.data.accountId && !response1.data.savingaccountId) {
        console.error(
          "Error: Unable to retrieve data returned from GetAccountType API."
        );
        setSnackbar({
          open: true,
          message:
            "Customer has no accounts. Please create one before continuing.",
          severity: "error",
        });
        return "";
      }

      const { accountId: depositId, savingaccountId: savingsId } =
        response1.data;

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

      const depositAccount = response.data.find(
        (account) => account?.accountId === depositId
      );
      const savingsAccount = response.data.find(
        (account) => account?.accountId === savingsId
      );

      setDepositAccount(depositAccount);
      setSavingsAccount(savingsAccount);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error fetching customer accounts.",
        severity: "error",
      });
      console.error("Error fetching customer accounts: ", error);
    }
  };
  useEffect(() => {
    getCustomerAccounts(customerId);
  }, [customerId]);

  //only get for that particular plan than i am looking at
  const getInvestmentPlans = useCallback(
    async (customerId) => {
      try {
        const url = `https://personal-elwlcep1.outsystemscloud.com/Investment/rest/Investment/GetInvestments?CustomerId=${customerId}`;
        const headers = {
          "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d", // Add the API Key here
        };
        const response = await axios.get(url, {
          headers,
        });

        const title = plan.title;
        const allPlans = response.data;
        const relatedPlans = allPlans
          .filter((plan) => plan.Type === title)
          .sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime));

        setInvestmentPlans(relatedPlans);
        setCurrentPlan(relatedPlans[0]);
      } catch (error) {
        return "";
      }
    },
    [plan.title]
  );
  useEffect(() => {
    getInvestmentPlans(customerId);
  }, [getInvestmentPlans, customerId]);

  useEffect(() => {
    setCurrentPlan(investmentPlans[0]);
  }, [investmentPlans]);

  //using credit score to get maximum leverage rate - highest investment plan only
  const getMaxLeverageRate = async (certificateNo) => {
    try {
      const url = `https://personal-svyrscxo.outsystemscloud.com/CreditScore/rest/CreditScore/GetCreditScore?CertificateNo=${certificateNo}
`;
      const headers = {
        "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d", // Add the API Key here
      };
      const response = await axios.get(url, {
        headers,
      });
      const creditScore = response.data;
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
      getMaxLeverageRate(user.certificate);
    }
  }, [plan, user]);
  useEffect(() => {
    if (maxLeverageRate) {
      setLeverageRate(maxLeverageRate);
    }
  }, [maxLeverageRate]);

  //to make payments to investment packages etc
  const withdrawFromAccount = async (amount, accountId, customerId) => {
    try {
      const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/account/${customerId}/WithdrawCash`;
      const content = {
        consumerId: customerId,
        transactionId: "-",
        accountId: accountId,
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
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const addInvestmentPlan = async (amount, maxLeverage, type) => {
    try {
      const response = await axios.post(
        `https://personal-elwlcep1.outsystemscloud.com/Investment/rest/Investment/AddInvestment`,
        {
          customerId: user.customerId,
          type: type,
          amount: amount,
          maximum_leverage: maxLeverage,
        },
        {
          headers: {
            "X-Contacts-Key": "c48b5803-757e-414d-9106-62ab010a9c8d", // Add the API Key here
          },
        }
      );
      getInvestmentPlans(user.customerId);
      return response.data;
    } catch (error) {
      console.error("Error adding investment object: ", error);
    }
  };

  const depositToAccount = async (amount, accountId) => {
    try {
      const url = `https://smuedu-dev.outsystemsenterprise.com/gateway/rest/account/${customerId}/DepositCash
`;
      const content = {
        consumerId: customerId,
        transactionId: 1,
        accountId: accountId,
        amount: amount,
        narrative: "deposit",
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
      return response.data;
    } catch (error) {
      console.error("Error Withdrawing Investment: ", error);
    }
  };

  //handle add investment funds
  const handleAddFunds = async (amount, accountId) => {
    try {
      //handle errors
      let account = [];
      if (accountId === savingsAccount.accountId) {
        account = savingsAccount;
      } else {
        account = depositAccount;
      }
      if (account.balance < amount) {
        setSnackbar({
          open: true,
          message: "Not enough balance in account. Try another account",
          severity: "error",
        });
        return;
      }

      const transactionFee = amount * 0.025; //include transaction fees
      let leveragedAmount = 0;
      if (plan.title === "Leveraged Green Growth Package") {
        leveragedAmount = amount * leverageRate;
      }
      const totalAmount = leveragedAmount + transactionFee;

      try {
        await withdrawFromAccount(
          totalAmount,
          account.accountId,
          user.customerId
        );
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Unable To Add Funds. Please try again",
          severity: "error",
        });
        return;
      }

      let newAmount = amount;
      if (investmentPlans.length > 0) {
        newAmount = parseFloat(investmentPlans[0].Amount) + parseFloat(amount); // Add to existing plan amount if available
      }

      try {
        await addInvestmentPlan(newAmount, leveragedAmount, plan.title);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Unable To Add Investment Plan. Please try again",
          severity: "error",
        });
        return; // Exit the function on failure
      }

      setInvestmentAmount(0.0);
      setSelectedFromAccount([]);
      setSnackbar({
        open: true,
        message: "Successfully Added Funds.",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Unable To Add Investment Plan. Please try again",
        severity: "error",
      });
      console.error(error);
    }
  };

  //handle withdraw investment funds
  const handleWithdrawFunds = async (amount, accountId) => {
    try {
      let account = [];
      if (accountId === savingsAccount.accountId) {
        account = savingsAccount;
      } else {
        account = depositAccount;
      }
      if (amount > currentPlan.Amount) {
        setSnackbar({
          open: true,
          message:
            "Not enough balance in investment account. Withdraw a lower amount.",
          severity: "error",
        });
        return;
      }

      const transactionFee = amount * 0.025; //include transaction fees
      const newAmount = amount - transactionFee;
      try {
        await depositToAccount(newAmount, account.accountId);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Unable to withdraw funds. Please try again.",
          severity: "error",
        });
        return;
      }

      // Update the investment plan with the new amount after withdrawal
      try {
        await addInvestmentPlan(
          investmentPlans[0].Amount - amount, // Subtract the withdrawn amount
          currentPlan.Maximum_Leverage,
          plan.title
        );
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Unable to update investment plan. Please try again.",
          severity: "error",
        });
        return;
      }

      // Reset state variables and show success message
      setWithdrawAmount(0.0);
      setSelectedWithdrawAccount([]);
      setSnackbar({
        open: true,
        message: "Successfully withdrew funds.",
        severity: "success",
      });
    } catch (error) {
      // General catch-all error handling for unexpected errors
      console.error("Error during withdrawal:", error);
      setSnackbar({
        open: true,
        message: "Unable to process the withdrawal. Please try again.",
        severity: "error",
      });
    }
  };

  if (!plan)
    return (
      <Typography variant="h5" style={{ fontFamily: "Montserrat, sans-serif" }}>
        Plan not found
      </Typography>
    );

  return (
    <>
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
            <Typography
              variant="body2"
              style={{
                fontFamily: "Montserrat, sans-serif",
                display: "flex",
                marginTop: "5px",
                alignItems: "center",
                fontSize: "0.75rem",
                color: "brown",
              }}
            >
              <InfoIcon fontSize="small" style={{ marginRight: "8px" }} />
              For more information or assistance regarding our investment plans,
              feel free to contact us at findaddy@gmail.com for personalized
              investment coaching (fees apply).
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
            {investmentPlans.length > 0 ? (
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
                    <strong>Current Amount:</strong> $ {currentPlan.Amount}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    <strong>Earnings:</strong> $
                    {calculateEarnings(currentPlan?.Amount).toFixed(2) ||
                      "Not available"}
                  </Typography>
                  {plan.title === "Leveraged Green Growth Package" && (
                    <Typography
                      variant="body1"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      <strong>Current Holding Amount:</strong> $
                      {currentPlan?.Maximum_Leverage || "Not available"}
                    </Typography>
                  )}
                  {plan.title === "Leveraged Green Growth Package" && (
                    <>
                      <Slider
                        value={leverageRate}
                        step={1}
                        min={1}
                        max={maxLeverageRate || 2}
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
                  <TextField
                    label="Add Investment Amount"
                    variant="outlined"
                    type="number"
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
                    {depositAccount !== null && (
                      <option
                        key={depositAccount.accountId}
                        value={depositAccount.accountId}
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Deposit Account: {depositAccount.accountId} (balance: $
                        {depositAccount.balance})
                      </option>
                    )}

                    {savingsAccount !== null && (
                      <option
                        key={savingsAccount.accountId}
                        value={savingsAccount.accountId}
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Savings Account: {savingsAccount.accountId} (balance: $
                        {savingsAccount.balance})
                      </option>
                    )}
                  </TextField>
                  {investmentAmount !== 0 && (
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
                    onClick={() =>
                      handleAddFunds(investmentAmount, selectedFromAccount)
                    }
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
                      max:
                        calculateEarnings(currentPlan?.Amount) +
                        currentPlan.Amount,
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
                    {depositAccount !== null && (
                      <option
                        key={depositAccount.accountId}
                        value={depositAccount.accountId}
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Deposit Account: {depositAccount.accountId} (balance: $
                        {depositAccount.balance})
                      </option>
                    )}

                    {savingsAccount !== null && (
                      <option
                        key={savingsAccount.accountId}
                        value={savingsAccount.accountId}
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Savings Account: {savingsAccount.accountId} (balance: $
                        {savingsAccount.balance})
                      </option>
                    )}
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
                      handleWithdrawFunds(
                        withdrawAmount,
                        selectedWithdrawAccount
                      )
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
                    <option value="" disabled></option>
                    {depositAccount !== null && (
                      <option
                        key={depositAccount.accountId}
                        value={depositAccount.accountId}
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Deposit Account: {depositAccount.accountId} (balance: $
                        {depositAccount.balance})
                      </option>
                    )}

                    {savingsAccount !== null && (
                      <option
                        key={savingsAccount.accountId}
                        value={savingsAccount.accountId}
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Savings Account: {savingsAccount.accountId} (balance: $
                        {savingsAccount.balance})
                      </option>
                    )}
                  </TextField>

                  {plan.title === "Leveraged Green Growth Package" && (
                    <>
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
                      />
                    </>
                  )}

                  {investmentAmount !== 0 && (
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
                    onClick={() =>
                      handleAddFunds(investmentAmount, selectedFromAccount)
                    }
                  >
                    Start Investment
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        {/* investment history */}
        <div>
          <InvestmentPlanTable transactionLogs={investmentPlans || []} />
        </div>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default InvestmentDetails;
