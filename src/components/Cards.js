import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const Cards = (prop) => {
  return (
    <div >
      <Card style={{ width: '18rem',height:'30rem' }}>
      <Card.Img variant="top" style={{  width:'18rem',height:'15rem' }}  src={prop.png} />
      <Card.Body>
        <Card.Title>{prop.title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Text>Fiyat: {prop.price}</Card.Text>
        <Button variant="primary">Bilgi</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Cards;
