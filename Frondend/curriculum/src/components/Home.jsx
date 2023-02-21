import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default Home;


// import React from 'react'
// import {Link} from 'react-router-dom'
// import logo from '../images/logo.jpg'


// const Home=()=> {
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
//   <div className="container-fluid col-lg-12">
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//       <a className="navbar-brand col-lg-6" href="#">
//       <img src={logo} style={{width:90,height:70, marginTop: 0,paddingRight:20,}} /><span style={{fontFamily:"Verdana, Geneva, Tahoma, sans-serif",fontSize:"larger"}}>ICTAK CURRICULUM TRACKER</span></a>
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0 col-lg-12">
//         <li className="nav-item col-lg-2">
//           <a className="nav-link active" aria-current="page" href="#">Home</a>
//         </li>
//         <li className="nav-item col-lg-2">
//           <a className="nav-link active" href="#">Login</a>
//         </li>
       
//       </ul>
     
//     </div>
//   </div>
// </nav>
// </div>
    
//   )
// }

// export default Home
