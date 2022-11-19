import React from 'react';
import './App.css';
import './index.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import Register from './Login/Register';
import Login from './Login/Login';
// import Login from './Login'
import MySubjects from './Subjects/MySubjects';
import Account from './Profil/Account';
import SubjectFav from './Subjects/SubjectFav';
import Home from './Home/Home';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/MySubjects" element={<MySubjects />} />
      <Route path="/Account" element={<Account />} />
      <Route path="/SubjectFav" element={<SubjectFav />} />
    </Routes>
  );
}

export default App;
