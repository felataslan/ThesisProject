import React from 'react'
import MenuEditor from '../components/menuEditor'
import { useEffect } from 'react'
import { useState } from 'react'
import 'bootstrap'
import '../style/users.scss'
import axios from 'axios'
import Card from '../components/cards'

const EditorProduct = () => {
    const [products, setProducts] = useState([]);
    const [isEditor, setIsEditor] = useState(false)
    const [isOwner, setIsOwner] = useState(false)

    useEffect(() => {

        axios.post('http://localhost:3100/Editor/product-all', {
            email: JSON.parse(localStorage.getItem('authEditor')).editor.email,
        },
            {
                headers: {
                    authorization: localStorage.getItem('tokenEditor')
                }
            }
        ).then((result) => {
            console.log(result)
            result.data.isEditor ? setIsEditor(true) : setIsEditor(false)
            const productList = []
            if (isEditor) {
                setIsOwner(true)
                result.data.users.map((item) => {
                    productList.push(item)
                    return productList;
                })
                setProducts(productList);
            }




        })

    }, [isEditor])

    const asyncDeleteProduct = async (product) => {
        let alertMessage = '';
        console.log(product)
        await axios.post('http://localhost:3100/editor/product-delete', {
            productID: product,
        },
            {
                headers: {
                    authorization: localStorage.getItem('tokenEditor')
                }
            }
        ).then((result) => {

            console.log(result.data)
            if (result.data.succeded) {
                alertMessage = result.data.message
            }
            axios.post('http://localhost:3100/editor/product-all', {
                email: JSON.parse(localStorage.getItem('authEditor')).editor.email,
            },
                {
                    headers: {
                        authorization: localStorage.getItem('tokenEditor')
                    }
                }
            ).then((result) => {
                if (result.data.isEditor) {
                    setIsOwner(false)
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

            <MenuEditor isLogin={localStorage.getItem("tokenEditor") ? true : false} />



            <div className='container' >

                <div className='row' id='bgusers'>
                    <h1>Ürünler</h1>
                </div>

                <div className='row'>
                    {products && products.length > 0 && products.map((result, index) => {
                        console.log('result', result)
                        return (
                            <div key={index || {}} className='col-lg-4 col-md-6 col-sm-12 mt-5'>
                                <Card id={result._id} click={asyncDeleteProduct} isAdmin={isEditor?true:false} isOwner={isOwner} description={result.description} to='/profile' png={result.url} title={result.productName} price={result.price + '₺'} />
                            </div>
                        )
                    })}

                </div>



            </div>



        </div>
    )
}

export default EditorProduct