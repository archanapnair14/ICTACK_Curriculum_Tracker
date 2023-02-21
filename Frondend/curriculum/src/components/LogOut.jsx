import React from "react";
import { useNavigate,redirect  } from "react-router-dom";

const Logout=()=> {
const navigate = useNavigate();
const userid = localStorage.getItem('userId');
const token = localStorage.getItem('userToken');

if(userid && token)
   localStorage.clear();
   window.location.reload()
   navigate('/');
}

export default Logout;
