import React from 'react'
import '../style/Menu.scss'
import "bootstrap/dist/css/bootstrap.css";
import 'react-bootstrap'
import { Link } from 'react-router-dom'


const Menu = () => {
  return (
    <div style={{ fontSize: '16px' }}>
      <nav className='head'>
        <h1 className='Header'>HIRE STUFF</h1>

        <ul >
          <li >
            <Link className='btn btn-primary  signUpButton  ' >
              <p className=' buttonTextLayout'>Sign Up</p>
            </Link>
          </li>
          <li>
            <Link className='btn btn-success loginButton '>
              <p className='buttonTextLayout'>Login</p>
            </Link>
          </li>
        </ul>
      

      <div className='navbar'>

      <ul >
        <li>Anasayfa</li>
        <li>Takılar</li>
        <li>Ev Eşyaları</li>
        <li>Teknolojik Aletler</li>

      </ul>
      </div>
      </nav>
    


    </div>
  )
}

export default Menu;