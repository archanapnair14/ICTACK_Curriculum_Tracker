import logo from './logo.svg';
import './App.css';

import Login from './components/Login';
import NavbarAdmin from './Navbar/NavbarAdmin';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Navbar from './Navbar/Navbar';

function App() {
  var [loggedin, setloggedin] = useState(0)
 
  console.log("lin",loggedin)
  
  const setlogin = (l) => {
    setloggedin(l)
  }

  if(loggedin===1)
  {
    return (
    <Router>
    <div className="App">
      <NavbarAdmin   setlogin={setlogin} />
      
    </div>
    </Router>
     );
    }
    else{
      return (
        
      <Router>
      <div className="App">
        <Navbar/>
        <Routes>
        <Route path="/login" element={<Login setlogin={setlogin}/>} />
        </Routes>
        </div>
        </Router>
  );
}
}
export default App;

