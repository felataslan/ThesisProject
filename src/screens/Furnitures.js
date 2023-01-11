import React, { useEffect } from 'react'
import Menu from '../components/menu.js'
import Card from '../components/cards.js'
import 'bootstrap'
import axios from 'axios'
import { useState } from 'react';
import '../style/furniture.scss'
import Footer from '../components/footer.js'



const Furniture = () => {


  const [furnitures, setFurnitures] = useState([]);
  const [furniture, setFurniture] = useState('');

  useEffect(() => {
    const userFurniture = []
    axios.get('http://localhost:3100/products/product/furniture', {

    }).then((result) => {
      if (result.data) {
        result.data.furniture.map((item) => {
          userFurniture.push(item);
          return userFurniture;
        })
        setFurnitures(userFurniture)
      }
    })

    



  }, [])

 const handleFormSubmit =(event) => {
    event.preventDefault();
    const newUserFurnitures=[]
    furnitures.map((item)=>{

      if(item.productName.toLowerCase()===furniture.toLowerCase()){
        newUserFurnitures.push(item)
        
      }
      return newUserFurnitures;
    })
    setFurnitures(newUserFurnitures)
    
}




  return (
    <div>
      <Menu   isLogin={localStorage.getItem("token") ? true : false} />

      <div className='container'>
        <div className='row ' id='bgfurniture'>

          <h1>Ev Eşyaları</h1>
        </div>




        <form onSubmit={handleFormSubmit}>
          <div id='searchbar' className="form-row mb-5">
            <div className="col-lg-10 mt-5" style={{position:'relative', top:'30px',display:'inline-block'}}>
              <input 
                value={furniture} onChange={(e) => setFurniture(e.target.value)}
                type="text" className="form-control col-lg-10"
                placeholder="Ürün Araştır"
              />
               
            </div>
            <div className='col-lg-2  mt-5' style={{position:'relative', top:'26px',left:'40px', display:'inline-block'}}>
            <button   type='submit' className='btn btn-primary ' >Ürün Ara </button>
            </div>
            
          </div>

        </form>

        <div id='jewerly' className='container' >
          <div className='row' >
            {furnitures && furnitures.length > 0 && furnitures.map((result, index) => {
              console.log('result', result)
              return (

                <div key={index || {}} className='col-sm-12 col-md-6 col-lg-4 mt-3 card-J' >
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
export default Furniture;