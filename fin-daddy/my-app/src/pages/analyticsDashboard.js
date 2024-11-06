import React, { useState, useEffect, useCallback, useMemo} from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { useParams, useNavigate } from "react-router-dom";


const Analytics = () => {
  return (
    <div>
        <h1>Analytics PAGE</h1>
    </div>
  );
};

export default Analytics;
