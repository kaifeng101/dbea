// import React, { useState, useEffect, useCallback, useMemo} from "react";
// import { useSelector } from "react-redux";
// import { selectUser } from "../redux/userSlice";
// import { useParams, useNavigate } from "react-router-dom";

import InvestmentComponent from "../components/Investments";

const Investments = () => {
  return (
    <div className="">
      <InvestmentComponent />
      <hr className="bg-black mt-5" />
    </div>
  );
};

export default Investments;
