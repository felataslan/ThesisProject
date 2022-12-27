
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";



const Cards = (prop) => {
  const navigate = useNavigate();

  const asyncSendProductID = async ()=>{
    if(localStorage.getItem('productid')){
      localStorage.removeItem('productid')
      localStorage.setItem('productid',prop.id)
      navigate('/fillProduct')
    }else{
      localStorage.setItem('productid',prop.id)
      navigate('/fillProduct')
    }
  }



  return (
    <div >
      
      <Card style={{ width: '18rem', height: '30rem', }}>
        <Card.Img variant="top" style={{ width: '18rem', height: '15rem' }} src={prop.png} />
        <Card.Body>
          <Card.Title onChange={(e)=>prop.change()}>{prop.title}</Card.Title>
          <Card.Text>
            {prop.description}
          </Card.Text>
          <Card.Text>Fiyat: {prop.price}</Card.Text>
          <Button  onClick={asyncSendProductID}  variant="primary">Bilgi</Button>
          
          <Button variant='danger' type='submit' onClick={(e)=>prop.click(prop.id)} style={{ marginLeft: '90px' ,display:prop.isOwner ? 'inline-block':'none'  }}>İlanı Kaldır</Button>
          
        </Card.Body>
      </Card>
    </div>
  )
}

export default Cards;
