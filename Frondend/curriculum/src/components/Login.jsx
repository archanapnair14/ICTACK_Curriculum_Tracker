import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';


function Login(props) {
    let navigate = useNavigate();
      const [formValues, setFormValues] = useState({ email: "", password: "" });
  
  
      // Manage Field Change
      const handleChange = (event) => {
           console.log(event.target);
          const { name, value } = event.target; //destructuring
          setFormValues({ ...formValues, [name]: value });
           console.log(formValues);
      }
  
      function authenticate() {
        console.log("in authenticate")
    
    if("admin@gmail.com"===formValues.email && "12345"===formValues.password)
    {
      props.setlogin(1);
      navigate("../", { replace: true });
       
    }
    else 
    {
      alert("Invalid Username or Password");
        navigate("../login", { replace: true })
        props.setlogin(0)
    }
    }
    return (
      
          
      <section class="vh-100" style={{backgroundColor:' #508bfc'}}>
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style={{borderRadius: '1rem'}}>
            <div class="card-body p-5 text-center">
  
              <h3 class="mb-5">Sign in</h3>
  
              <div class="form-outline mb-4" style={{textAlign:'left'}} >
                <input type="email" id="typeEmailX-2" name="email" class="form-control form-control-lg" onChange={handleChange} value={formValues.email} required/>
                <label class="form-label" for="typeEmailX-2">Username</label>
              </div>
  
              <div class="form-outline mb-4" style={{textAlign:'left'}} >
                <input type="password" id="typePasswordX-2" name="password" class="form-control form-control-lg" onChange={handleChange} value={formValues.password} required/>
                <label class="form-label" for="typePasswordX-2">Password</label>
              </div>
  
             
              
              <button class="btn btn-primary btn-lg btn-block" type="submit" onClick={authenticate}>Login</button>
  <br></br>
  <a href="/signup">Go to Sign Up</a>
              <hr class="my-4"/>
  
              
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
    )
  }
  
  export default Login