import React from 'react'
import Menu from '../components/Menu'

const Furniture = () => {



  return (
    <div>
        <Menu isLogin={localStorage.getItem("token")? true:false}/>

          <h1>Furniture</h1>  

    </div>
  )
}
export default Furniture;