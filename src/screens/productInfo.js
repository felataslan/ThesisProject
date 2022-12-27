import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Menu from '../components/menu.js'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Footer from '../components/footer.js'




const ProductInfo = () => {
window.scrollTo(0,0);
const navigate = useNavigate();
const [name,setName]=useState('');
const [productName,setProductName]=useState('');
const [category,setCategory]=useState('');
const [email,setEmail]=useState('');
const [phone,setPhone]=useState('');
const [description,setDescription]=useState('');
const [url,setUrl]=useState('');
const [price,setPrice]=useState('');


    useEffect(()=>{

        axios.post('http://localhost:3100/products/product/fillproduct',
        {
            data: localStorage.getItem('productid'),
        },
        {
            headers:{
                authorization:localStorage.getItem('token'),
            }
        }

        ).then((result)=>{
            console.log('result',result.data.data)
            console.log('result',result.data.user)
            setName(result.data.user.name + ' ' + result.data.user.surname)
            setCategory(result.data.data.category)
            setProductName(result.data.data.productName)
            setEmail(result.data.data.email)
            setPhone(result.data.data.phone)
            setDescription(result.data.data.description)
            setUrl(result.data.data.url)
            setPrice(result.data.data.price)





        })
}, []);

  const sendMail= ()=>{
    if(localStorage.getItem('email')){
      localStorage.removeItem('email')
      localStorage.setItem('email',email)
      navigate('/mailer')
    }else{
      localStorage.setItem('email',email)
      navigate('/mailer')

    }
  }



  return (
    <div>       
        <Menu isLogin={localStorage.getItem("token")? true:false} />
        
        <Card style={{ width: '50%', height: '36rem', top:'3rem',position:'relative', left:'25%', backgroundColor:'#dc3545' }}>
        <Card.Img variant="top" style={{ position:'relative', left:'25%', width: '50%', height: '15rem' }} src={url} />
        <Card.Body>
          <Card.Title>Ürün Kategorisi: {category}</Card.Title>
          <Card.Text>Ürün Adı: {productName}</Card.Text>
          <Card.Text>
            {description}
          </Card.Text>
          <Card.Text>Fiyat: {price}</Card.Text>
          <Card.Text>Telefon: {phone}</Card.Text>
          <Card.Text>Email: {email}</Card.Text>
          <Card.Text>Ürün Sahibi: {name}</Card.Text>

        
          <Button  onClick={sendMail} variant="primary">Email Gönder</Button>
          
        </Card.Body>
      </Card>

      <Footer />
    </div>
  )
}

export default ProductInfo