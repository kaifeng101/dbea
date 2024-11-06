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

function App() {
  const user = useSelector(selectUser);

  // if (user !== null) {
  //   userRole = user.role;
  //   userPosition = user.position;
  // }

  return (
    <>
      <Router>
        <div className="dashboard">
        {user && (
          <div className="app-navbar">
            <NavBar
            />
          </div>
        )}
          <div className={`dashboard--content ${user ? 'ml-[77px]' : ''}`}>
            <Routes>
              <Route
                path="/"
                element={
                  // <Navigate to={user ? "/PersonalSchedule" : "/login"} />
                  <Navigate to={"/login"} />
                }
              />
              {/* <Route
                path="/login"
                                element={
                  !user ? <Login /> : <Navigate to="/PersonalSchedule" />
                }
              /> */}
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
