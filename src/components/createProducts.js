import React, { useState } from 'react'
import "../style/addStuff.scss"
import axios from 'axios'
import {useNavigate}  from 'react-router-dom';


function CreateSurveyComponenet() {

    //   const location=useLocation()
    // const [photoProduct, setphotoProduct] = useState("");
    const [category, setCategory] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [price, setPrice] = useState("");
    const navigate=useNavigate();

    let alertMessage='';




    function InvalidMsg(e) {
        if (e.target.value === '') {
            e.target.setCustomValidity('Please fill in the marked fields');
        }
        else {
            e.target.setCustomValidity('');
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(localStorage.getItem('token')){
            axios.post('http://localhost:3100/products/createproduct',
        {
            // photoFile:photoProduct,
            category:category,
            productName:productName,
            description:description,
            phone:phone,
            price:price,
        },
        {
            headers:{
                authorization:localStorage.getItem('token'),
            },
        }
        ).then((result)=>{
                console.log(result)
                if(result.status){
                    alertMessage+='Ürün başarıyla oluşturuldu'
                    navigate('/listStuff')

                }
        }).catch((result)=>{
            console.log(result);
            alertMessage='Ürün oluşturulamadı'
        })

        }else{
            navigate('/login')
        }
        alert(alertMessage)
    }
    return (
        <div>
            <div className='createSurveyContainer'>
                <div className='createSurvey'>
                    <h2> Ürün Ekle</h2>
                    <div className='questionInput'>
                        <form onSubmit={handleSubmit}>
                            {/* <div className="form-group">
                                <label htmlFor="exampleInputEmail1" style={{ fontSize: "16px" }}>Ürün Fotoğrafı</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <input value={photoProduct} onChange={(e) => setphotoProduct(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required style={{ marginBottom: "0px" }} type="file" className="form-control questionInputStyle" id="exampleInputEmail1"  />
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail2" style={{ fontSize: "16px" }}>Ürün Kategorisi</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <input value={category} onChange={(e) => setCategory(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required style={{ marginBottom: "0px" }} type="text" className="form-control questionInputStyle" id="exampleInputEmail2" placeholder="Lütfen Ürün kategorisini seçiniz" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail3" style={{ fontSize: "16px" }}>Ürün adı</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <input value={productName} onChange={(e) => setProductName(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required style={{ marginBottom: "0px" }} type="text" className="form-control questionInputStyle" id="exampleInputEmail3" placeholder="Lütfen Ürün adını giriniz" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail4" style={{ fontSize: "16px" }}>Açıklama</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <input value={description} onChange={(e) => setDescription(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required type="text" className="form-control questionInputStyle" id="exampleInputEmail4" placeholder="Lütfen ürün açıklamasını giriniz" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone" style={{ fontSize: "16px" }}>Telefon</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required type="tel" className="form-control questionInputStyle" id="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}" placeholder="Lütfen Telefon Numaranızı giriniz. Örnek(524-024-24-24)"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price" style={{ fontSize: "16px" }}>Fiyat</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <input value={price} onChange={(e) => setPrice(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required type="number" className="form-control questionInputStyle" id="price"  placeholder="Lütfen Ürün fiyatını giriniz " />
                            </div>




                            <div className='createButtonContainer'>
                                <button type="submit" className='createButton'>Create</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateSurveyComponenet