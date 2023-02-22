import React from "react";
import { Routes,Route } from "react-router-dom";
import Curriculum from "./components/CurriculumForm";
import Home from "./components/Home";
import Readcurriclum from "./components/Crudcurriclum";
import Requirements from "./components/Requirements";
import LoginPage from "./components/SignIn";
import SignUp from "./components/Signup";
import View from "./components/ViewRequirements";
import MyCard from "./components/FacultyCurriculums";
import AllCurriculums from "./components/ApprovedCurriculums";
import Searchtab from "./components/Searchtab";
import Search from "./components/Search";
import Updatecurriculam from "./components/Updatecurriculam";

import Logout from "./components/LogOut";
import Page from "./components/Page";
import EditCurriculam from "./components/EditCurriculum";
import EditCurriculums from "./components/FaculityEdit";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import Pages from "./components/Pages";

const App = () => {

  const userid = localStorage.getItem('userId');


  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUp />} />
       <Route
          exact
          path="/curriculum/:id"
          element={userid ? <Curriculum /> : <Home />}
        />
        <Route exact path="/view" element={userid ? <View /> : <Home />} />
        <Route exact path="/page" element={userid ? <Page />: <Home/>} />
        <Route exact path="/requirements" element={userid?<Requirements />: <Home/>} />
        <Route exact path="/pages" element={userid ? <Pages/>: <Home/>} />



        <Route
          exact
          path="/read"
          element={userid ? <Readcurriclum /> : <Home />}
        />
        <Route
          exact
          path="/approved"
          element={userid ? <Searchtab /> : <Home />}
        />
        <Route
          exact
          path="/adminapproved"
          element={userid ? <Search /> : <Home />}
        />
        <Route
          exact
          path="/update/:id"
          element={userid ? <Updatecurriculam /> : <Home />}
        />
        <Route
          exact
          path="/edits"
          element={userid ? <EditCurriculums /> : <Home />}
        />
        <Route
          exact
          path="/edit/:id"
          element={userid ? <EditCurriculam /> : <Home />}
        />
        <Route exact path="/logout" element={userid ? <Logout /> : <Home />} />
      </Routes> 
    </>
  );
};

export default App;
