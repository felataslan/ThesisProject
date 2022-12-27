import React, { useEffect } from 'react'
import Menu from '../components/menu.js'
import Card from '../components/cards.js'
import Footer from '../components/footer.js'
import '../style/homePage.scss'
import 'bootstrap'
import { useState } from 'react';
import axios from 'axios'
const HomePage = () => {

      window.scrollTo(0, 0);

      const [tecnology, setTecnology] = useState([]);
      const [jewerly, setJewerly] = useState([]);
      const [furniture, setFurniture] = useState([]);
      

      useEffect(() => {

            axios.get('http://localhost:3100/products/product/all', {
                  
            }).then((result) => {
                  console.log('res,', result)
                  if (result.data) {
                        const userJewerly = []
                        const userTecnology = []
                        const userFurniture = []
                        result.data.tecnology.map((item) => {
                              userTecnology.push(item);
                              return userTecnology;
                        })
                        result.data.furniture.map((item) => {
                              userFurniture.push(item);
                              return userFurniture;
                        })
                        result.data.jewerly.map((item) => {
                              userJewerly.push(item);
                              return userJewerly;
                        })

                        console.log('F', userFurniture)
                        console.log('T', userTecnology)
                        console.log('J', userJewerly)

                        setTecnology(userTecnology)
                        setFurniture(userFurniture)
                        setJewerly(userJewerly)



                  }
            })




      }, [])





      return (
            <div style={{ fontSize: '16px' }}>
                  <Menu isLogin={localStorage.getItem('auth') ? true : false} />

                  <div className='container'>
                        <div className='row' id='bghire'>
                              <h1>HIRE STUFF ' A Hoşgeldiniz</h1>
                        </div>
                  </div>




                  <div id='furniture' className='container' >
                        <h3 style={{ textAlign: 'center' }}>Ev Eşyaları</h3>
                        <div className='row' >
                              {furniture && furniture.length > 0 && furniture.map((result, index) => {
                                    console.log('result', result)
                                    return (

                                          <div key={index || {}} className='col-sm-12 col-md-6 col-lg-4 mt-3  card-J' >
                                                <Card  id={result._id} isOwner={false} description={result.description} to='/profile' png={result.url} title={result.productName} price={result.price + '₺'} />
                                          </div>
                                    )
                              })}


                        </div>

                  </div>

                  <div id='jewerly' className='container'>
                        <h3 style={{ textAlign: 'center' }}>Takılar</h3>
                        <div className='row' >
                        {jewerly && jewerly.length > 0 && jewerly.map((result, index) => {
                                    console.log('result', result)
                                    return (

                                          <div key={index || {}} className='col-sm-12 col-md-6 col-lg-4  card-J' >
                                                <Card id={result._id} isOwner={false} description={result.description} to='/profile' png={result.url} title={result.productName} price={result.price + '₺'} />
                                          </div>
                                    )
                              })}

                        </div>

                  </div>

                  <div id='tecnology' className='container'>

                        <h3 style={{ textAlign: 'center' }}>Teknolojik Aletler</h3>
                        <div className='row' >
                        {tecnology && tecnology.length > 0 && tecnology.map((result, index) => {
                                    console.log('result', result)
                                    return (

                                          <div key={index || {}} className='col-sm-12 col-md-6 col-lg-4  card-J' >
                                                <Card id={result._id} isOwner={false} description={result.description} to='/profile' png={result.url} title={result.productName} price={result.price + '₺'} />
                                          </div>
                                    )
                              })}

                        </div>

                  </div>

                  <Footer />

            </div>
      )
}

export default HomePage;