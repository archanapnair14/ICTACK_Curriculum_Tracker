import React from "react";
import { Routes, Route } from "react-router-dom";
import Curriculum from "./components/CurriculumForm";
import Home from "./components/Home";
import Requirements from "./components/Requirements";
import LoginPage from "./components/SignIn";
import SignUp from "./components/Signup";
import View from "./components/ViewCurriculum";
import Readcurriclum from "./components/Readcurriclum";

const App = () => {
  return (
    <>
       <Readcurriclum />
      {/* <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginPage/>} />
        <Route exact path="/requirements" element={<Requirements/>} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/curriculum/:id" element={<Curriculum/>} />
        <Route exact path="/view" element={<View/>} />




      </Routes> */}
    </>
  );
};

export default App;
