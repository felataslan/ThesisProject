import React, { useState } from 'react'
import "../style/addStuff.scss"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function CreateSurveyComponenet() {

    //   const location=useLocation()
    const [photoProduct, setPhotoProduct] = useState("");
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
            setPhotoProduct(e.target.files[0])
            

        }

    }


    const asyncHandleSubmit = async (e) => {
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
                    <h2> ??r??n Ekle</h2>
                    <div className='questionInput' >
                        <form onSubmit={asyncHandleSubmit} encType='multipart/form-data'>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" style={{ fontSize: "16px" }}>??r??n Foto??raf??</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <input type="file" name='image' onChange={onFileUpload} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required style={{ marginBottom: "0px" }} className="form-control questionInputStyle" id="exampleInputEmail1" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Kategori</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <select value={category} name='category' onInput={InvalidMsg} onInvalidCapture={InvalidMsg} onChange={(e) => setCategory(e.target.value)} required className="form-control" id="category">
                                    <option >L??tfen ??r??n kategorinizi se??iniz</option>
                                    <option>Ev E??yas??</option>
                                    <option>Tak??</option>
                                    <option>Teknolojik Aletler</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail3" style={{ fontSize: "16px" }}>??r??n ad??</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <input value={productName} onChange={(e) => setProductName(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required style={{ marginBottom: "0px" }} type="text" className="form-control questionInputStyle" id="exampleInputEmail3" placeholder="L??tfen ??r??n ad??n?? giriniz" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail4" style={{ fontSize: "16px" }}>A????klama</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <input value={description} onChange={(e) => setDescription(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required type="text" className="form-control questionInputStyle" id="exampleInputEmail4" placeholder="L??tfen ??r??n a????klamas??n?? giriniz" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone" style={{ fontSize: "16px" }}>Telefon</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required type="tel" className="form-control questionInputStyle" id="phone" pattern="[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}" placeholder="L??tfen Telefon Numaran??z?? giriniz. ??rnek(524-024-24-24)" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price" style={{ fontSize: "16px" }}>Fiyat</label>
                                <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                                <input value={price} onChange={(e) => setPrice(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required type="number" className="form-control questionInputStyle" id="price" placeholder="L??tfen ??r??n fiyat??n?? giriniz " />
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