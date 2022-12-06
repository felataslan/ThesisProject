import React from 'react'
import Menu from '../components/Menu'
import "../style/addStuff.scss"
import CreateProduct from '../components/createProducts'
import Footer from '../components/Footer'


const AddStuff = () => {

  return (
    <div>
        <Menu isLogin={localStorage.getItem("token")? true:false}/>

          <CreateProduct />
        

          <Footer/>
    </div>
  )
}
export default AddStuff;