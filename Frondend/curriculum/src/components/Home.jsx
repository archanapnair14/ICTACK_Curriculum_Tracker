import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import logo from '../images/logo.jpg'
import './Home.css';

const Home = () => {
  return (
    <>
<div>
<nav className="navbar navbar-expand-lg  navbar-dark">
<div className="container-fluid col-lg-12">
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
<a className="navbar-brand col-lg-6" href="#">
<img src={logo} style={{width:90,height:70, marginTop: 0,paddingRight:20,}} /><span style={{fontFamily:'revert',fontSize:"larger",color:'#fff'}}>ICTAK CURRICULUM TRACKER</span></a>
</div>
<ul className="navbar-nav offset-4 mb-2 mb-lg-0 col-lg-12">
<li class="nav-item col-lg-2">
                  <Link
                    to="/login"
                    className="nav-link  active"
                    aria-current="page"
                  >
                    Login
                  </Link>
                </li>
       
      </ul>
 </div>
</nav>
</div>
    
    </>
  );
};

export default Home;


