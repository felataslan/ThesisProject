import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import HomePage from './screens/HomePage';
import  Jewelry  from './screens/Jewelry';
import Furniture from './screens/Furnitures';
import Tecnology from './screens/Tecnology';
import Profile from './screens/Profile';
import AddStuff from './screens/AddStuff';
import UserInfo from './screens/UserInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/jewelry' element={<Jewelry/>}/>
      <Route path='/furniture' element={<Furniture/>}/>
      <Route path='/tecnology' element={<Tecnology/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/addStuff' element={<AddStuff/>}/>
      <Route path='/userInfo' element={<UserInfo/>}/>





    </Routes>
  </Router>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
