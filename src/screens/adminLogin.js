import React,  { useState } from 'react'
import MenuAdmin from '../components/menuAdmin'
import eyeIcon from "../image/eye.png"
import Warning from '../image/warning.png'
import "../style/login.scss"
import '../style/menu.scss'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Footer from '../components/footer.js'
import  'bootstrap'

const Admin = () => {

  const navigate = useNavigate();
  const [controlVisible, setControlVisible] = useState(true);
  const [islogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function InvalidMsg(e) {
    if (e.target.value === '') {
      e.target.setCustomValidity('Please fill in the marked fields');
    }
    else if (e.target.validity.typeMismatch) {
      e.target.setCustomValidity('Please write a valid e-mail address in the marked field.');
    }
    else {
      e.target.setCustomValidity('');
    }
    return true;
  }
  function InvalidMsgPassword(e) {
    if (e.target.value === '') {
      e.target.setCustomValidity('Please fill in the marked fields');
    }
    else if (e.target.validity.patternMismatch) {
      e.target.setCustomValidity('Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
    }
    else {
      e.target.setCustomValidity('');
    }
    return true;
  }
  const handleSubmit = (e) => {

    e.preventDefault();
    axios.post('http://localhost:3100/admin/login', {
      "email": email,
      "password": password,
    })
      .then((result) => {
        console.log(result)
        if (result.status === 200) {
          
          localStorage.setItem('tokenAdmin',result.data.token,{
            httpOnly:true,
            maxAge:1000*60*60*24,

          })

          localStorage.setItem('authAdmin',JSON.stringify(result.data))
          navigate("/users")

        }
        else {
          alert("username or password is wrong");
        }
      }).catch((result) => {
        setIsLogin(false)
        console.log(result)
      })
  }
  return (
    <div>
      <MenuAdmin  />

      <div className='login bg-danger'>
          
          <h3 className='continue mt-3'>Admin Login</h3>
        
        <div className='form col-md-12'>
          <form onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">E-mail</label>
              <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
              <input title="Please fill in the marked fields" onInput={InvalidMsg} onInvalidCapture={InvalidMsg} value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your e-mail address" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Şifre</label>
              <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
              <input title='Please fill in the marked fields' onInput={InvalidMsgPassword} onInvalidCapture={InvalidMsgPassword} value={password} onChange={(e) => setPassword(e.target.value)} required type={controlVisible ? "password" : "text"} className="form-control" id="exampleInputPassword1" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Enter your password" />
              <div style={{top:islogin? '-25px':null, left:"90%", position:'relative'}} className='eyeIconImg' type='button' onClick={() => setControlVisible(!controlVisible)}>
                <img src={eyeIcon} alt="" />
              </div>
            </div>
            <div style={{display: islogin ? 'flex': 'none'}} className='wrongLogIn'>
              <img style={{height:"20px"}} src={Warning} alt="" />
              <p style={{marginLeft:"5px"}}>Tekrar Şifre</p>
            </div>
            <div className='buttonLayout'>
              <button className='submitButton' type="submit">Login</button>
            </div>
          </form>
          
        </div>
      </div>
      <Footer/>

    </div>
  )
}

export default Admin