import React, { useState } from 'react'
import Menu from '../components/menu.js'
import '../style/forgetPass.scss'
import Footer from '../components/footer.js'
import axios from 'axios'
import 'bootstrap'

const ForgetPass = () => {
    const [email, setEmail] = useState('');
    const [isSend, setIsSend] = useState(false);



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
    const asyncHandleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3100/users/forget', {
            email: email
        }).then((result) => {
            console.log(result)
            if (result.data.succeded) {
                setEmail('');
                setIsSend(true)
                setTimeout(() => {
                    setIsSend(false)
                }, 3000)
            }
        })
    }

    return (
        <div>
            <Menu />

            <div className="col-md-12">
                <div style={{ display: isSend ? "block" : "none", position:'relative', top:'30px'  }} className="alert alert-success mt-5" id="sendMessage" >
                    E-mail başarı ile gönderildi. Mail kutunuzu kontrol ediniz.
                </div>
            </div>

            <div className='forget bg-danger'>

                <h3 className='continue mt-3'>Şifremi Unuttum</h3>

                <div className='form col-md-12'>
                    <form onSubmit={asyncHandleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">E-mail</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <input title="Please fill in the marked fields" onInput={InvalidMsg} onInvalidCapture={InvalidMsg} value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Lütfen Email Adresinizi Giriniz.." />
                        </div>

                        <div className='buttonLayout  '>
                            <button className='submitButton btn' type="submit">Gönder</button>
                        </div>
                    </form>

                </div>

            </div>
            <Footer />


        </div>
    )
}

export default ForgetPass