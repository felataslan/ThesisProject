import React, { useEffect } from 'react'
import Menu from '../components/Menu'
import Card from '../components/Cards.js'
import 'bootstrap'
import axios from 'axios'
import { useState } from 'react';
import '../style/jewerly.scss'
import Footer from '../components/Footer.js'


const Jewelry = () => {



  const [jewerlys, setJewerlys] = useState([]);
  const [jewerly, setJewerly] = useState('');

  useEffect(() => {
    const userJewerly = []
    axios.get('http://localhost:3100/products/product/jewerly', {

    }).then((result) => {
      if (result.data) {
        result.data.jewerly.map((item) => {
          userJewerly.push(item);
          return userJewerly;
        })
        setJewerlys(userJewerly)
      }
    })

    



  }, [])

 const handleFormSubmit =  (event) => {
    event.preventDefault();
    const newUserJewerly=[]
    jewerlys.map((item)=>{
      if(item.productName.toLowerCase()===jewerly.toLowerCase()){
        newUserJewerly.push(item)
      }
      return newUserJewerly;
    })
    setJewerlys(newUserJewerly)
    
}




  return (
    <div>
      <Menu isLogin={localStorage.getItem("token") ? true : false} />

      <div className='container'>
        <div className='row ' id='bgjewerly'>

          <h1>Takılar</h1>
        </div>




        <form onSubmit={handleFormSubmit}>
          <div id='searchbar' className="form-row mb-5">
            <div className="col-lg-10 mt-5" style={{position:'relative', top:'30px',display:'inline-block'}}>
              <input 
                value={jewerly} onChange={(e) => setJewerly(e.target.value)}
                type="text" className="form-control col-lg-10"
                placeholder="Ürün Araştır"
              />
               
            </div>
            <div className='col-lg-2 mt-5' style={{position:'relative', top:'26px',left:'40px', display:'inline-block'}}>
            <button   type='submit' className='btn btn-primary ' >Ürün Ara </button>
            </div>
            
          </div>

        </form>

        <div id='jewerly' className='container' >
          <div className='row' >
            {jewerlys && jewerlys.length > 0 && jewerlys.map((result, index) => {
              console.log('result', result)
              return (

                <div key={index || {}} className='col-sm-12 col-md-6 col-lg-4  card-J' >
                  <Card id={result._id}  isOwner={false} description={result.description}  png={result.url} title={result.productName} price={result.price + '₺'} />
                </div>
              )
            })}


          </div>

        </div>


      </div>

        <Footer/>

    </div>
  )
}
export default Jewelry;