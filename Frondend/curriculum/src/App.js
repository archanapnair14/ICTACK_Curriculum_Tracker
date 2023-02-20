import React from "react";
import { Routes, Route } from "react-router-dom";
import Curriculum from "./components/CurriculumForm";
import Home from "./components/Home";
import Readcurriclum from "./components/Crudcurriclum";
import Requirements from "./components/Requirements";
import LoginPage from "./components/SignIn";
import SignUp from "./components/Signup";
import View from "./components/ViewRequirements";
import MyCard from "./components/FacultyCurriculums";
import AllCurriculums from "./components/ApprovedCurriculums";
import LogoutButton from "./components/LogOut";
import Searchtab from "./components/Searchtab";

const App = () => {
  const userid = localStorage.getItem("userId");

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route
          exact
          path="/requirements"
          element={userid ? <Requirements /> : <Home />}
        />
        <Route exact path="/signup" element={<SignUp />} />
        <Route
          exact
          path="/curriculum/:id"
          element={userid ? <Curriculum /> : <Home />}
        />
        <Route exact path="/view" element={userid ? <View /> : <Home />} />
        <Route
          exact
          path="/read"
          element={userid ? <Readcurriclum /> : <Home />}
        />
        <Route
          exact
          path="/approved"
          element={userid ? <Searchtab/> : <Home />}
        />
        <Route
          exact
          path="/adminapproved"
          element={userid ? <AllCurriculums /> : <Home />}
        />
        <Route
          exact
          path="/logout"
          element={userid ? <LogoutButton /> : <Home />}
        />
      </Routes>
    </>
  );
};

export default App;
