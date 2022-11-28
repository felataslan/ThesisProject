import React from 'react'
import Menu from '../components/Menu'

const ListStuff = () => {



  return (
    <div>
        <Menu isLogin={localStorage.getItem("token")? true:false}/>

          <h1>ListStuff page</h1>  

    </div>
  )
}
export default ListStuff;