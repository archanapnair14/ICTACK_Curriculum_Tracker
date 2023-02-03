import React from 'react'
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import "../Navbar/Navbar.css";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
    <a href="/" class="navbar-brand d-flex align-items-center px-4 px-lg-5">
    
    <img src={logo} style={{width:'50px', height:'50px', marginRight:'10px'}}></img>
    </a>
    <div class="content">
<h2>ICTAK</h2>

</div>
    
    <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav ms-auto p-4 p-lg-0">
       
        {/* <Link to="/" class="nav-item nav-link">Home</Link>
        <Link to="/about" class="nav-item nav-link">About</Link>
        <Link to="/courses" class="nav-item nav-link">Courses</Link> */}
            <Link to="/login" class="nav-item nav-link">Login</Link>
           
            
           
        </div>
       
        
    </div>
</nav>
  )
}

export default Navbar