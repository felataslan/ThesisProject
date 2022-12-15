import React, { useState } from 'react'
import "../style/addStuff.scss"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function CreateSurveyComponenet() {

    //   const location=useLocation()
    const [photoProduct, setphotoProduct] = useState("");
    const [category, setCategory] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    let alertMessage = '';




    function InvalidMsg(e) {
        if (e.target.value === '') {
            e.target.setCustomValidity('Please fill in the marked fields');
        }
        else {
            e.target.setCustomValidity('');
        }
        return true;
    }


    const onFileUpload = (e) => {
        console.log(e.target.files);
        console.log(e.target)
        if (e.target && e.target.files[0]) {
            setphotoProduct(e.target.files[0])
            

        }

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData();
        formdata.append('image', photoProduct)
        formdata.append('category', category)
        formdata.append('productName',productName)
        formdata.append('description',description)
        formdata.append('phone',phone)
        formdata.append('price',price)

        console.log(formdata)


        if (localStorage.getItem('token')) {
            await axios.post('http://localhost:3100/products/product',
                formdata,
                {
                    headers: {
                        authorization: localStorage.getItem('token'),
                    },
                },

            ).then((result) => {
                console.log(result)
                if (result.status === 201) {
                    alertMessage = result.data.message
                    navigate('/profile')

                }
            }).catch((result) => {
                console.log(result);
                alertMessage = result.data.message
            })

        } else {
            navigate('/login')
        }
        alert(alertMessage)
    }

    return (
        <div>
            <div className='createSurveyContainer'>
                <div className='createSurvey'>
                    <h2> Ürün Ekle</h2>
                    <div className='questionInput' >
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" style={{ fontSize: "16px" }}>Ürün Fotoğrafı</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <input type="file" name='image' onChange={onFileUpload} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required style={{ marginBottom: "0px" }} className="form-control questionInputStyle" id="exampleInputEmail1" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Kategori</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <select value={category} name='category' onInput={InvalidMsg} onInvalidCapture={InvalidMsg} onChange={(e) => setCategory(e.target.value)} required className="form-control" id="category">
                                    <option >Lütfen Ürün kategorinizi seçiniz</option>
                                    <option>Ev Eşyası</option>
                                    <option>Takı</option>
                                    <option>Teknolojik Aletler</option>
                                </select>
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
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required type="tel" className="form-control questionInputStyle" id="phone" pattern="[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}" placeholder="Lütfen Telefon Numaranızı giriniz. Örnek(524-024-24-24)" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price" style={{ fontSize: "16px" }}>Fiyat</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <input value={price} onChange={(e) => setPrice(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required type="number" className="form-control questionInputStyle" id="price" placeholder="Lütfen Ürün fiyatını giriniz " />
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