import React from 'react'
import Menu from '../components/Menu'

const AddStuff = () => {



  return (
    <div>
        <Menu isLogin={localStorage.getItem("token")? true:false}/>

          <h1>AddStuff Page</h1>  

    </div>
  )
}
export default AddStuff;