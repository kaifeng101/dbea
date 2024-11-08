import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./pages/login";
import Transaction from "./pages/transaction"; // Renamed Transactions to QRAndCreditPayment
import DirectDebitPayment from "./pages/directDebitPayment";
import AnalyticsDashboard from "./pages/analyticsDashboard";
import CarbonMarketplace from "./pages/carbonMarketplace";
import Investments from "./pages/investments";
import MilesRedemption from "./pages/milesRedemption";
import OnBoarding from "./pages/onBoarding";
import Profile from "./pages/profile";
import ViewAll from "./pages/viewAll";
import Authorisation from "./pages/authorisation";
import Termination from "./pages/termination";
import BillPayment from "./pages/billPayment"

function App() {
  return (
    <>
      <Router>
        <div>
        {/* {user && ( */}
          <div className="app-navbar">
            <NavBar />
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/billPayment" element={<BillPayment />} />
              <Route path="/directDebitPayment" element={<DirectDebitPayment />}>
                <Route path="viewAll" element={<ViewAll />} />
                <Route path="authorisation" element={<Authorisation />} />
                <Route path="termination" element={<Termination />} />
              </Route>
              <Route path="/investments" element={<Investments />} />
              <Route path="/carbonMarketplace" element={<CarbonMarketplace />} />
              <Route path="/milesRedemption" element={<MilesRedemption />} />
              <Route path="/onBoarding" element={<OnBoarding />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/analyticsDashboard" element={<AnalyticsDashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
