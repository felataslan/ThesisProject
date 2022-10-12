import React from 'react'
import Menu from '../components/Menu.js'
import Card from '../components/Cards.js'
import '../style/HomePage.scss'
import Chair from '../jeverly/chair.png'
import Table from '../jeverly/table.png'
import Carpet from '../jeverly/carpet.png'

const Homepage = () => {
  return (
    <div style={{fontSize:'16px'}}>
      <Menu/>
      <div id='jewerly' className='container' >
        <h4>Ev Eşyaları</h4>
        <div className='row' >
              <div className='col-3 card-J'>
                   <Card png={Chair} title='Sandalye' price='200 TL' />
              </div>
              <div className='col-3 card-J'>
                    <Card png={Table} title='Masa' price='400 TL' />
              </div>
              <div className='col-3 card-J'>
                    <Card png={Carpet} title='Halı' price='300 TL'  />
              </div>
              
        </div>

    </div>

    <div id='furniture'>


    </div>

    <div id='Tecnology'>

    </div>


    </div>
  )
}

export default Homepage;