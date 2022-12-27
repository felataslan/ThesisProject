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
import Login from './screens/login';
import SignUp from './screens/signUp';
import HomePage from './screens/homePage';
import  Jewelry  from './screens/jewelry';
import Furniture from './screens/furnitures';
import Tecnology from './screens/tecnology';
import Profile from './screens/profile';
import AddStuff from './screens/addStuff';
import UserInfo from './screens/userInfo';
import ProductInfo from './screens/productInfo';
import Contact from './screens/contact';
import ForgetPass from './screens/forgetPass';

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
      <Route path='/fillProduct' element={<ProductInfo/>}/>
      <Route path='/mailer' element={<Contact/>}/>
      <Route path='/forget' element={<ForgetPass/>}/>
    





    </Routes>
  </Router>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
