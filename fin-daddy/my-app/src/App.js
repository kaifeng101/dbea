import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // useLocation,
} from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./pages/login";
import Transactions from "./pages/transactions"
import AnalyticsDashboard from "./pages/analyticsDashboard"
import CarbonMarket from "./pages/carbonMarketplace"
import Investments from "./pages/investments"
import MilesRedemption from "./pages/milesRedemption"
import OnBoarding from "./pages/onBoarding"
import Profile from "./pages/profile"
import SignUp from "./pages/signup"

import { useSelector } from "react-redux";
import { selectUser } from "./redux/userSlice";
import CarbonMarketplace from "./pages/carbonMarketplace";

function App() {
  // const user = useSelector(selectUser);

  // if (user !== null) {
  //   userRole = user.role;
  //   userPosition = user.position;
  // }

  return (
    <>
      <Router>
        <div className="dashboard">
        {/* {user && ( */}
          <div className="app-navbar">
            <NavBar
            />
          </div>
        {/* )} */}
          <div className={`dashboard--content ml-[77px]`}>
            <Routes>
              <Route
                path="/"
                element={
                  <Login/>
                }
              />
              <Route path="/transactions" element={<Transactions />} />
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
