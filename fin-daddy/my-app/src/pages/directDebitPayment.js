import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../DirectDebitPayment.css"; // Ensure this CSS file is included

function DirectDebitPayment() {
  return (
    <div className="direct-debit-page">
      <h1> Direct Debit Payment</h1>
      <div className="top-menu">
        <ul>
          <li><Link to="viewAll">View All</Link></li>
          <li><Link to="authorisation">Authorisation</Link></li>
          <li><Link to="termination">Termination</Link></li>
        </ul>
      </div>
      <div className="content">
        <Outlet /> {/* This renders the nested route component */}
      </div>
    </div>
  );
}

export default DirectDebitPayment;
