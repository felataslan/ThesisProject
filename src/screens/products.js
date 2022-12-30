import React from 'react'
import MenuAdmin from '../components/menuAdmin'
import { useEffect } from 'react'
import { useState } from 'react'
import 'bootstrap'
import '../style/users.scss'
import axios from 'axios'
import Card from '../components/cards'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {

    axios.post('http://localhost:3100/admin/product-all', {
      email: JSON.parse(localStorage.getItem('authAdmin')).admin.email,
    },
      {
        headers: {
          authorization: localStorage.getItem('tokenAdmin')
        }
      }
    ).then((result) => {
      console.log(result)
      result.data.isAdmin ? setIsAdmin(true) : setIsAdmin(false)
      const productList = []
      if (isAdmin) {
        setIsOwner(true)
        result.data.users.map((item) => {
          productList.push(item)
          return productList;
        })
        setProducts(productList);
      }




    })

  }, [isAdmin])

  const asyncDeleteProduct = async (product) => {
    let alertMessage = '';
    console.log(product)
    await axios.post('http://localhost:3100/admin/product-delete', {
      productID: product,
    },
      {
        headers: {
          authorization: localStorage.getItem('tokenAdmin')
        }
      }
    ).then((result) => {

      console.log(result.data)
      if (result.data.succeded) {
        alertMessage = result.data.message
      }
      axios.post('http://localhost:3100/admin/product-all', {
        email: JSON.parse(localStorage.getItem('authAdmin')).admin.email,
      },
        {
          headers: {
            authorization: localStorage.getItem('tokenAdmin')
          }
        }
      ).then((result) => {
        if (result.data.isAdmin) {
          setIsOwner(true)
          const newProductsData = []
          result.data.users.map((item) => {
            newProductsData.push(item)
            return newProductsData;
          })
          setProducts(newProductsData)
        }
      })


    })
    alert(alertMessage)

  }


  return (
    <div>
     
          <MenuAdmin isLogin={localStorage.getItem("tokenAdmin") ? true : false} />
      

      <div className='container' >

        <div className='row' id='bgusers'>
          <h1>Ürünler</h1>
        </div>

        <div className='row'>
          {products && products.length > 0 && products.map((result, index) => {
            console.log('result',result)
            return(
              <div    key={index || {}} className='col-lg-4 col-md-6 col-sm-12 mt-5'>
                <Card id={result._id} click={asyncDeleteProduct} isAdmin={isAdmin} isOwner={isOwner} description={result.description} to='/profile' png={result.url} title={result.productName} price={result.price + '₺'} />
              </div>
            )
          })}

        </div>



      </div>



    </div>
  )
}

export default Products