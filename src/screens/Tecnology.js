import React, { useEffect } from 'react'
import Menu from '../components/menu.js'
import Card from '../components/cards.js'
import 'bootstrap'
import axios from 'axios'
import { useState } from 'react';
import '../style/tecnology.scss'
import Footer from '../components/footer.js'

const Tecnology = () => {

  const [tecnologys, setTecnologys] = useState([]);
  const [tecnology, setTecnology] = useState('');

  useEffect(() => {
    const userTecnology = []
    axios.get('http://localhost:3100/products/product/tecnology', {

    }).then((result) => {
      if (result.data) {
        
        result.data.tecnology.map((item) => {
          userTecnology.push(item);
          return userTecnology;
        })
        setTecnologys(userTecnology)
      }
    })

    



  }, [])

 const handleFormSubmit =  (event) => {
    event.preventDefault();
    const newUserTecnology=[]
    tecnologys.map((item)=>{
      if(item.productName.toLowerCase()===tecnology.toLowerCase()){
        newUserTecnology.push(item)
      }
      return newUserTecnology;
    })
    setTecnologys(newUserTecnology)
}




  return (
    <div>
      <Menu  isLogin={localStorage.getItem("token") ? true : false} />

      <div className='container'>
        <div className='row ' id='bgtecnology'>

          <h1>Teknolojik Aletler</h1>
        </div>




        <form onSubmit={handleFormSubmit}>
          <div id='searchbar' className="form-row mb-5">
            <div className="col-lg-10 mt-5" style={{position:'relative', top:'30px',display:'inline-block'}}>
              <input 
                value={tecnology} onChange={(e) => setTecnology(e.target.value)}
                type="text" className="form-control col-lg-10"
                placeholder="Ürün Araştır"
              />
               
            </div>
            <div className='col-lg-2 mt-5' style={{position:'relative', top:'26px',left:'40px', display:'inline-block'}}>
            <button   type='submit' className='btn btn-primary ' >Ürün Ara </button>
            </div>
            
          </div>

        </form>

        <div id='tecnology' className='container' >
          <div className='row' >
            {tecnologys && tecnologys.length > 0 && tecnologys.map((result, index) => {
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
export default Tecnology;