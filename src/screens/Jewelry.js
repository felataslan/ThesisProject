import React from 'react'
import Menu from '../components/Menu'
import '../style/jewelry.scss'

const Jewelry = () => {



  return (
    <div>
        <Menu isLogin={localStorage.getItem("token")? true:false}/>

          <h1>Jewelry</h1>  

    </div>
  )
}
export default Jewelry;