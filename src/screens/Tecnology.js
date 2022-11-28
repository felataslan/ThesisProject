import React from 'react'
import Menu from '../components/Menu'

const Tecnology = () => {



  return (
    <div>
        <Menu isLogin={localStorage.getItem("token")? true:false}/>

          <h1>Tecnology</h1>  

    </div>
  )
}
export default Tecnology;