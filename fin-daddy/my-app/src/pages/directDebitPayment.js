import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../DirectDebitPayment.css"; // Ensure this CSS file is included

function DirectDebitPayment() {
  return (
    <body style={styles.back}>
    <div className="direct-debit-page mt-16">
      <h1 style={styles.title}> Direct Debit Payment</h1>
      <div className="top-menu" style={styles.menu}>
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
    </body>
  );
}

const styles = {
  title:{
    fontSize: "30px",
    margin: "10px",
    paddingLeft:"20px",
    fontFamily: "Montserrat, sans-serif"
  },
  menu:{
    fontFamily: "Montserrat, sans-serif"
  },
  back:{
    backgroundColor: "#f8f9fa"
  }

}

export default DirectDebitPayment;
