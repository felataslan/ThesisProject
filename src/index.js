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
import Jewelry  from './screens/jewelry';
import Furniture from './screens/furnitures';
import Tecnology from './screens/tecnology';
import Profile from './screens/profile';
import AddStuff from './screens/addStuff';
import UserInfo from './screens/userInfo';
import ProductInfo from './screens/productInfo';
import Contact from './screens/contact';
import ForgetPass from './screens/forgetPass';
import Admin from './screens/adminLogin'
import Editor from './screens/editorLogin';
import Users from './screens/users';
import Products from './screens/products';
import Editors from './screens/editors';
import AddEditor from './screens/addEditor';
import EditorProduct from './screens/editorProduct';
import EditorUsers from './screens/editorUsers';


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
      <Route path='/add-stuff' element={<AddStuff/>}/>
      <Route path='/user-info' element={<UserInfo/>}/>
      <Route path='/fill-product' element={<ProductInfo/>}/>
      <Route path='/mailer' element={<Contact/>}/>
      <Route path='/forget' element={<ForgetPass/>}/>
      <Route path='/login-admin' element={<Admin/>}/>
      <Route path='/login-editor' element={<Editor/>}/>
      <Route path='/editors' element={<Editors/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/add-editor' element={<AddEditor/>}/>
      <Route path='/editor-products' element={<EditorProduct/>}/>
      <Route path='/editor-users' element={<EditorUsers/>}/>






    





    </Routes>
  </Router>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
