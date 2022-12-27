import React, { useState } from 'react'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import 'bootstrap'
import '../style/contact.scss'
import axios from 'axios';


const Contact = () => {

  const [name, setname] = useState('');
  const [surName, setsurname] = useState('');
  const [description, setDescription] = useState('')
  const [email, setemail] = useState('');
  const [isSend, setIsSend] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post('http://localhost:3100/products/product/mail', {
        name: name,
        surName: surName,
        message: description,
        email: email,
        emailTo: localStorage.getItem('email'),
      },
      ).then((result) => {
        console.log(result)
        if (result.data.succeded) {
          setname('')
          setsurname('')
          setemail('');
          setDescription('')
          setIsSend(true)
          setTimeout(() => {
            setIsSend(false)
          }, 3000)
        }
      }).catch((result) => {
        console.log(result)

      })



    } catch (error) {
      console.log("ERR::", error)
    }

  }



  function InvalidMsg(e) {
    if (e.target.value === '') {
      e.target.setCustomValidity('Please fill in the marked fields');
    }
    else if (e.target.validity.typeMismatch) {
      e.target.setCustomValidity('Please write a valid e-mail address in the marked field.');
    }
    else {
      e.target.setCustomValidity('');
    }
    return true;
  }

  return (
    <div>
      <Menu isLogin={localStorage.getItem('auth') ? true : false} />

      <div className="col-md-12">
        <div style={{ display: isSend ? "block" : "none" , position:'relative', top:'30px' }} className="alert alert-success mt-5" id="sendMessage" >
          E-mail ürün sahibine başarıyla gönderildi. 
        </div>
      </div>

      <div className='container bg-danger ' id='mail'>

        <h3>Email Gönder</h3>


        <div className='row'>
          <div className='col-lg-12'>
            <div className='form '>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputName">Ad</label>
                  <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                  <input
                    onInput={(e) => e.target.setCustomValidity("")}
                    onInvalidCapture={(e) => e.target.setCustomValidity("Lütfen adınızı giriniz.")}
                    value={name} onChange={(e) => setname(e.target.value)}
                    required type="text" className="form-control" id="exampleInputName"
                    aria-describedby="nameUpdateHelp" placeholder="Lütfen Adınızı giriniz" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputSurname">Soyad</label>
                  <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                  <input onInput={(e) => e.target.setCustomValidity("")}
                    onInvalidCapture={(e) => e.target.setCustomValidity("Lütfen soyadınızı giriniz.")}
                    value={surName} onChange={(e) => setsurname(e.target.value)} required type="text"
                    className="form-control" id="exampleInputSurname" aria-describedby="surNameUpdateHelp" placeholder="Lütfen Soyadınızı giriniz" />
                </div>


                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email </label>
                  <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                  <input
                    onInput={InvalidMsg} onInvalidCapture={InvalidMsg}
                    value={email} onChange={(e) => setemail(e.target.value)}
                    required type="email" className="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Lütfen E-mail adresinizi giriniz" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputUserName1">Açıklama</label>
                  <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                  <textarea onInput={(e) => e.target.setCustomValidity("")}
                    onInvalidCapture={(e) => e.target.setCustomValidity("Lütfen Açıklama Kısmını Doldurunuz")}
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    required type="name" className="form-control" id="exampleInputUserName1"
                    aria-describedby="userNameUpdateHelp" placeholder="Lütfen Açıklama Kısmını Doldurunuz" />
                </div>
                <div style={{ paddingTop: '30px' }} className='buttonLayout'>
                  <button className='submitButton'>Gönder</button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
     
      <Footer/>
    </div>
  )
}

export default Contact