import React from 'react'
import '../style/Menu.scss'
import "bootstrap/dist/css/bootstrap.css";
import 'react-bootstrap'
import { Link } from 'react-router-dom'


const Menu = ({to='/'}) => {

  return (
    <div style={{ fontSize: '16px' }}>
      <nav className='head bg-danger'>
        <h1 className='Header'>HIRE STUFF</h1>

        <ul >
          <li style={{display: to==='/signup' ? 'none': 'block'}}>
            <Link to={'/signup'} className='btn btn-primary  signUpButton  ' >
              <p className=' buttonTextLayout'>Sign Up</p>
            </Link>
          </li>
          <li>
            <Link to={'/login'}  className='btn btn-success loginButton '>
              <p className='buttonTextLayout'>Login</p>
            </Link>
          </li>
        </ul>


        <div className='navbar ' >

          <ul>
            <li className='nav-item '><Link to={'/'}>Anasayfa</Link></li>
            <li className='nav-item '><Link to={'/'}>Takılar</Link></li>
            <li className='nav-item '><Link to={'/'}>Ev Eşyaları</Link></li>
            <li className='nav-item '><Link to={'/'}>Teknolojik Aletler</Link></li>

          </ul>
        </div>
      </nav>



    </div>
  )
}

export default Menu;