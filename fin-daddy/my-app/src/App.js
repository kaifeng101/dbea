import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./pages/login";
import QRAndCreditPayment from "./pages/qrCreditPayment"; // Renamed Transactions to QRAndCreditPayment
import DirectDebitPayment from "./pages/directDebitPayment";
import AnalyticsDashboard from "./pages/analyticsDashboard";
import CarbonMarketplace from "./pages/carbonMarketplace";
import Investments from "./pages/investments";
import MilesRedemption from "./pages/milesRedemption";
import OnBoarding from "./pages/onBoarding";
import Profile from "./pages/profile";
import Beneficiary from "./pages/beneficiary";

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
              <Route path="/qrCreditPayment" element={<QRAndCreditPayment />} />
              <Route path="/directDebitPayment" element={<DirectDebitPayment />} />
              <Route path="/beneficiary" element={<Beneficiary />} />
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
