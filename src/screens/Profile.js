import React, { useEffect } from 'react'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Card from '../components/Cards'
import { useState } from 'react';
import '../style/profile.scss'
import 'bootstrap'
// import { useNavigate } from "react-router-dom";

import axios from 'axios'
const Profile = () => {
  window.scrollTo(0, 0);
  // const navigate = useNavigate();
  const [stuff,setStuff]=useState([]);
  const [tecnology, setTecnology] = useState([]);
  const [jewerly, setJewerly] = useState([]);
  const [furniture, setFurniture] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3100/products/product', {
      headers: {
        authorization: localStorage.getItem('token')
      }
    }).then((result)=>{

      console.log('Result',result.data.data)
      if(result.data.data && result.data.data.length>0){
        const userProductData=[]
        const userJewerly=[]
        const userTecnology=[]
        const userFurniture=[]
        result.data.data.map((item)=>{
          console.log('item',item)
          userProductData.push(item);
          if(item.category==='Teknolojik Aletler'){
            userTecnology.push(item)
          }
          else if(item.category==='Ev Eşyası'){
            userFurniture.push(item)
          }
          else if(item.category==='Takı'){
            userJewerly.push(item)
          }
        })

        setStuff(userProductData)
        setTecnology(userTecnology)
        setFurniture(userFurniture)
        setJewerly(userJewerly)


      }
    })

    // if (!localStorage.getItem("token")) {
    //   navigate("/login")
    //  }




  },[])





  return (
    <div>
      <Menu isLogin={localStorage.getItem("token") ? true : false} />




      <div className='container '>

        <div className='row ' id='bghire'>

          <h1>HIRE STUFF</h1>
          <div className='col-3'>
            <button className='btn mt-5' style={{ color: 'white', backgroundColor: 'rgb(140, 10, 10)' }}>Eklenen ürün: {stuff.length}</button>

          </div>
          <div className='col-3'>
            <button className='btn mt-5' style={{ color: 'white', backgroundColor: 'rgb(140, 10, 10)' }}>Ev eşyası: {furniture.length}</button>
          </div>
          <div className='col-3'>
            <button className='btn mt-5' style={{ color: 'white', backgroundColor: 'rgb(140, 10, 10)' }}>Takı: {jewerly.length}</button>
          </div>
          <div className='col-3 ' >
            <button className='btn mt-5' style={{ color: 'white', backgroundColor: 'rgb(140, 10, 10)' }}>Teknolojik aletler: {tecnology.length}</button>
          </div>
        </div>

        <div className='row'>
          {stuff && stuff.length>0 && stuff.map((result,index)=>{
            console.log("----------------")
            console.log(stuff)
            console.log('result',result)
            return(
            <div className='col-4 mt-5'>
            <Card to='/profile' png={result.url} title={result.productName} price={result.price+'₺'} />
          </div>
            )
          })}
          
        </div>


      </div>






      <Footer />


    </div>
  )
}
export default Profile;