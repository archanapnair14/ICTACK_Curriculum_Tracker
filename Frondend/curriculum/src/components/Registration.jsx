import React from "react";
import { useState } from "react";
import "./Registration.css";
//import MyForm from './DbForm';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
     // let navigate = useNavigate();

      const MyForm=(value)=>{

        const [val,setVal]=useState(value)
  
        return [val,(event)=>{
            setVal({...val,[event.target.name]:event.target.value})
        }]
    }
      var [myvalue, setmyValue] = MyForm({ title: "", type: "",category: "",organisation:"",image:""})
      const addrequirement = () => {
          console.log(myvalue);

          axios.post("http://localhost:3004/api/requirements", myvalue);
                  alert("Successfully Added")
                //  navigate("/", { replace: true })

      }

      var loadFile = function (event) {
        var image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
        console.log(event.target.files[0].name)
       setmyValue(myvalue.image=event.target.files[0].name);
      };
    var gettype=()=>{
      var e = document.getElementById("type");
    var st = e.options[e.selectedIndex].text;
    console.log(st);
    setmyValue(myvalue.type=st);
    }
    var getCategory=()=>{
      var e = document.getElementById("category");
    var ct = e.options[e.selectedIndex].text;
    console.log(ct);
    setmyValue(myvalue.category=ct);
    }

    

  return (
    <div>
      <div className="addrequirement">
        <form className="screen">
          <div className="screen-header">
            <h1 className="app-title">Requirement form</h1>
          </div>
          <div className="screen-body">
            <div className="screen-body-item left">
              <div className="app-form">
                <label className="app-form-group">Name of Requirement</label>
                <div className="app-form-group">
                  <input
                    className="app-form-control"
                    placeholder="Name of Requirement"
                    name="title"    value={myvalue.title} onChange={setmyValue}
                    required
                  />
                </div>

                <br></br>
                <label className="app-form-group">Training Areas</label>
                <br></br>
<div>
                <select
                  name="type"
                  className="app-form-control"
                  id="type"  onClick={gettype}>
                  <option>select</option>
                  <option value="fsd">FSD</option>
                  <option value="ml-ai">ML-AI</option>
                  <option value="dsa">DSA</option>
                  <option value="rpa">RPA</option>
                  <option value="st">ST</option>
                  <option value="csa">CSA</option>
                </select>
                </div>
                <br></br>

                <div>
                  <label className="app-form-group">
                    Category of Requirement
                  </label>
                  <br></br>
                  <select
                    name="category"
                    class="app-form-control"
                    id="category" onClick={getCategory}>
                    <option>select</option>
                    <option value="retail">Retail</option>
                    <option value="academic">Academic</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
               <br></br>
                <label className="app-form-group">
                  Institution/Corporate office requirement came from
                </label>
                <div className="app-form-group">
                  <input
                    className="app-form-control"
                    placeholder="organisation"
                    name="organisation" value={myvalue.organisation} onChange={setmyValue}
                    required
                  />
                </div>

                <br></br>

                <div>
                  <p>
                    <input
                      type="file"
                      accept="image/*"
                      name="image" id="file" onChange={loadFile}
                    />
                  </p>
                  <p>
                    <img id="output" width="100" />
                  </p>
                  <label for="file"></label>
                  <br />
                </div>

                <div className="app-form-group buttons">
                  <button className="app-form-button" onClick={addrequirement}>ADD REQUIREMENT</button>
                </div>
              </div>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
