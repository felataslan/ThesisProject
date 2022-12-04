import React from 'react'
import Menu from '../components/Menu.js'
import Card from '../components/Cards.js'
import Footer from '../components/Footer.js'
import '../style/HomePage.scss'
import Chair from '../jeverly/chair.png'
import Table from '../jeverly/table.png'
import Carpet from '../jeverly/carpet.png'
import Kolye from '../furniture/kolye.png'
import Bilezik from '../furniture/bilezik.png'
import Kupe from '../furniture/kupe.png'
import Bilgisayar from '../tecnology/bilgisayar.png'
import Laptop from '../tecnology/laptop.png'
import Telefon from '../tecnology/telefon.png'
const HomePage = () => {
  return (
    <div style={{fontSize:'16px'}}>
      <Menu  isLogin={ true} />
      <div id='jewerly' className='container' >
        <h4 style={{textAlign:'center'}}>Ev Eşyaları</h4>
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

    <div id='furniture' className='container'>
    <h4 style={{textAlign:'center'}}>Takılar</h4>
        <div className='row' >
              <div className='col-3 card-F'>
                   <Card png={Kolye} title='Kolye' price='6000 TL' />
              </div>
              <div className='col-3 card-F'>
                    <Card png={Bilezik} title='Bilezik' price='8400 TL' />
              </div>
              <div className='col-3 card-F'>
                    <Card png={Kupe} title='Küpe' price='5300 TL'  />
              </div>
              
        </div>

    </div>

    <div id='tecnology' className='container'>

    <h4 style={{textAlign:'center'}}>Teknolojik Aletler</h4>
        <div className='row' >
              <div className='col-3 card-T'>
                   <Card png={Bilgisayar} title='Kolye' price='6000 TL' />
              </div>
              <div className='col-3 card-T'>
                    <Card png={Laptop} title='Bilezik' price='8400 TL' />
              </div>
              <div className='col-3 card-T'>
                    <Card png={Telefon} title='Küpe' price='5300 TL'  />
              </div>
              
        </div>

    </div>

      <Footer/>

    </div>
  )
}

export default HomePage;