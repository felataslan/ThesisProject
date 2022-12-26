import React, { useEffect } from 'react'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Card from '../components/Cards'
import { useState } from 'react';
import '../style/profile.scss'
import 'bootstrap'
import axios from 'axios'

const Profile = () => {
  window.scrollTo(0, 0);

  const [stuffs, setStuffs] = useState([]);
  const [tecnology, setTecnology] = useState([]);
  const [jewerly, setJewerly] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [isOwner, setisOwner] = useState(false)

  useEffect(() => {

    axios.get('http://localhost:3100/products/product', {
      headers: {
        authorization: localStorage.getItem('token') ? localStorage.getItem('token'): ''
      }
    }).then((result) => {
      
     
      if (result.data.user === JSON.parse(localStorage.getItem('auth')).user._id) {
        setisOwner(true);
      }
      if (result.data.data && result.data.data.length > 0) {
        const userProductData = []
        const userJewerly = []
        const userTecnology = []
        const userFurniture = []
        result.data.data.map((item) => {
          userProductData.push(item);
          if (item.category === 'Teknolojik Aletler') {
            userTecnology.push(item)
          }
          else if (item.category === 'Ev Eşyası') {
            userFurniture.push(item)
          }
          else if (item.category === 'Takı') {
            userJewerly.push(item)
          }
          return userProductData && userJewerly && userTecnology && userFurniture;
        })

        console.log(userProductData)

        setStuffs(userProductData)
        setTecnology(userTecnology)
        setFurniture(userFurniture)
        setJewerly(userJewerly)



      }
    })

  }, [])

 const deleteProduct = async (stuff)=>{
      let alertMessage=''
      console.log(stuff)
      await axios.post('http://localhost:3100/products/product/delete',{
        productID:stuff,
      },
      {
        headers:{
            authorization:localStorage.getItem('token')
        }
      }).then((result)=>{
        console.log(result.data)

        if(result.data.succeded){
          alertMessage=result.data.message;
        }
        axios.get('http://localhost:3100/products/product',{
          headers:{
            authorization:localStorage.getItem('token')
          }
        }).then((result)=>{

          if (result.data.data && result.data.data.length >= 0) {
            const newUserProductData = []
            const newUserJewerly = []
            const newUserTecnology = []
            const newUserFurniture = []
            result.data.data.map((item) => {
              newUserProductData.push(item);
              if (item.category === 'Teknolojik Aletler') {
                newUserTecnology.push(item)
              }
              else if (item.category === 'Ev Eşyası') {
                newUserFurniture.push(item)
              }
              else if (item.category === 'Takı') {
                newUserJewerly.push(item)
              }
              return newUserProductData && newUserJewerly && newUserTecnology && newUserFurniture;
            })
    
            console.log(newUserProductData)
    
            setStuffs(newUserProductData)
            setTecnology(newUserTecnology)
            setFurniture(newUserFurniture)
            setJewerly(newUserJewerly)
    
    
    
          }

        })
        
      })
      alert(alertMessage)
 }



  return (
    <div>
      <Menu isLogin={localStorage.getItem("token") ? true : false} />




      <div className='container '>

        <div className='row ' id='bghire'>

          <h1>HIRE STUFF</h1>
          <div className='col-3'>
            <button className='btn mt-5' style={{ color: 'white', backgroundColor: 'rgb(140, 10, 10)' }}>Eklenen ürün: {stuffs.length}</button>

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
          {stuffs && stuffs.length > 0 && stuffs.map((result, index) => {
            console.log('result',result)
            return(
              <div    key={index || {}} className='col-lg-4 col-md-6 col-sm-12 mt-5'>
                <Card id={result._id} click={deleteProduct} isOwner={isOwner} description={result.description} to='/profile' png={result.url} title={result.productName} price={result.price + '₺'} />
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