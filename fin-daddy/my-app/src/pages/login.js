import React, { useState, useEffect, useCallback, useMemo} from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
// import { useParams, useNavigate } from "react-router-dom";
import LoginComponent from "../components/Login";


const Login = () => {
  return (
    <div className="flex justify-center">
        <LoginComponent/>
    </div>
  );
};

export default Login;
