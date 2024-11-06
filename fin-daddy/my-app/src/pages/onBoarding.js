import React, { useState, useEffect, useCallback, useMemo} from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { useParams, useNavigate } from "react-router-dom";


const OnBoarding = () => {
  return (
    <div>
        <h1>OnBoarding PAGE</h1>
    </div>
  );
};

export default OnBoarding;
