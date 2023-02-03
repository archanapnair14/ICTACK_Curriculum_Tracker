import React from 'react';
import logo from "../assets/logo.png";
//import '..//..//css/style.css';
import { Link ,useNavigate} from "react-router-dom";



function NavbarAdmin(props) {
    let navigate = useNavigate();
    function logout(){
        props.setlogin(0);
        navigate("../", { replace: true })
    }
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
        <Link to="/courses" class="nav-item nav-link">Courses</Link>
                 */}
                
            
          
        </div>
       
        {/* <Link to="" class="nav-item nav-link" onClick={logout}>Logout</Link>    */}
    </div>
</nav>
  )
}

export default NavbarAdmin