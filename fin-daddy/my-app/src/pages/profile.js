import React, { useState, useEffect, useCallback, useMemo} from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { useParams, useNavigate } from "react-router-dom";


const Profile = () => {
  return (
    <div>
        <h1>Profile PAGE</h1>
    </div>
  );
};

export default Profile;
