import React from 'react';
import "../style/signUp.scss";
import eyeIcon from "../image/eye.png"
// import Warning from "../image/warning.png"
import "../style/login.scss";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/menu.js';
import Footer from '../components/footer.js'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp =()=> {
    const navigate = useNavigate();
    const [controlVisible, setControlVisible] = useState(true);
    const [controlVisibleConfirm, setControlVisibleConfirm] = useState(true);
    const [name, setName] = useState("");
    const [surName,setSurname]=useState('');
    const [userName,setUserName]=useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    // const [country, setCountry] = useState("");
    const [islogin, setIsLogin] = useState(false);
    // const [countryList, setCountryList] = useState([]);
    // const [cityList, setCityList] = useState([]);

    // useEffect(() => {
    //     axios.get(
    //         '/api/user/countries',

    //         {}
    //     ).then((result) => {
    //         const countryData = []
    //         result.data.data.surveys.map((item) => {
    //             //console.log(item)
    //             countryData.push(item)
    //         })

    //         setCountryList(countryData);
    //     })
    // }, [])

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
    function InvalidMsgPassword(e) {
        console.log(password)
        if (e.target.value === '') {
            e.target.setCustomValidity('Please fill in the marked fields');
        }
        else if (e.target.validity.patternMismatch) {
            e.target.setCustomValidity('Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
        }
        else if(password===confirmPassword){
            e.target.setCustomValidity('');
        }
        return true;
    }
    function InvalidMsgConfirmPassword(e) {
        console.log("password confrim passwrod")
        console.log(password)
        console.log(confirmPassword)
        if (e.target.value === '') {
            e.target.setCustomValidity('Please fill in the marked fields');
        }
        else if(password!==confirmPassword){
            e.target.setCustomValidity('Passwords do not match.');
        }
        else{
            e.target.setCustomValidity('');
        }
        return true;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(surName);
        console.log(userName);
        console.log(email);
        console.log(password);
        console.log(gender);
        console.log(city);
        axios.post('http://localhost:3100/users/signup', {
            "name":name,
            "surname":surName,
            "userName": userName,
            "email": email,
            "password": password,
            "gender": gender,
            "city": city,
        })
            .then((result) => {
                if (result.status) {
                    alert("User successfully registered")
                    navigate("/login");
                }
            })
            .catch((result) => {
                
                console.log(result);
                setIsLogin(true)
                console.log(islogin)
            })
           

    /////////

        console.log(email);
    }
    return (
        <div className='App'>
           <Menu to='signup'/>

            <div className='SignUp bg-danger' id='edit'>
                
                    <h3>Sign Up</h3>
                


                <div className='form'>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                            <label htmlFor="exampleInputName">Ad</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <input 
                            onInput={(e) => e.target.setCustomValidity("")} onInvalidCapture={(e) => e.target.setCustomValidity("Lütfen adınızı giriniz.")}  
                            value={name} onChange={(e) => setName(e.target.value)}  
                            required type="text" className="form-control" id="exampleInputName" 
                            aria-describedby="nameHelp" placeholder="Lütfen Adınızı giriniz" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputSurname">Soyad</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <input onInput={(e) => e.target.setCustomValidity("")} onInvalidCapture={(e) => e.target.setCustomValidity("Lütfen soyadınızı giriniz.")} value={surName} onChange={(e) => setSurname(e.target.value)}  required type="text" className="form-control" id="exampleInputSurname" aria-describedby="surnameHelp" placeholder="Lütfen Soyadınızı giriniz" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputUserName1">Username</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <input onInput={(e) => e.target.setCustomValidity("")} onInvalidCapture={(e) => e.target.setCustomValidity("Lütfen kullanıcı adınızı giriniz")} value={userName} onChange={(e) => setUserName(e.target.value)} required  type="name" className="form-control" id="exampleInputUserName1" aria-describedby="emailHelp" placeholder="Enter your username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <input onInput={InvalidMsg} onInvalidCapture={InvalidMsg} value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Lütfen E-mail adresinizi giriniz" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Choose Gender</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <select   onInput={(e) => e.target.setCustomValidity("")} onInvalidCapture={(e) => e.target.setCustomValidity("Lütfen cinsiyetinizi seçiniz")} value={gender} onChange={(e) => setGender(e.target.value)} required className="form-control" id="gender" name='sellist' >
                                <option placeholder='Lütfen cinsiyetinizi seçiniz'></option>
                                <option>Kadın</option>
                                <option>Erkek</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Select City</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <select onInput={(e) => e.target.setCustomValidity("")} onInvalidCapture={(e) => e.target.setCustomValidity("Please Choose city")} value={city} onChange={(e) => setCity(e.target.value)} required className="form-control" id="city">
                                <option></option>
                                <option>İstanbul</option>
                                <option>İzmir</option>
                                <option>Ankara</option>
                                <option>Kocaeli</option>
                                <option>Antalya</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword">Password</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <input onChange={(e) => setPassword(e.target.value)} onInput={InvalidMsgPassword} onInvalidCapture={InvalidMsgPassword} value={password} required type={controlVisible ? "password" : "text"} className="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" id="exampleInputPassword" placeholder="Enter your password" />
                            <div className='eyeIcon' style={{left:"90%", position:'relative', top:"-30px"}} type='button' onClick={() => setControlVisible(!controlVisible)}>
                                <img src={eyeIcon} alt="" />
                            </div>
                        </div>
                        <div className="form-group" style={{position:"relative", top:"-20px"}}>
                            <label htmlFor="exampleConfirmPassword">Confirm your Password</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <input value={confirmPassword} onInput={InvalidMsgConfirmPassword} onInvalidCapture={InvalidMsgConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required type={controlVisibleConfirm ? "password" : "text"} className="form-control" id="exampleConfirmPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Confirm your password" />
                            <div className='eyeIcon' style={{left:"90%", position:'relative', top:"-30px"}} type='button' onClick={() => setControlVisibleConfirm(!controlVisibleConfirm)}>
                                <img src={eyeIcon} alt="" />
                            </div>
                        </div>
                        {/* <div style={{ display: islogin ? 'flex' : 'none' }} className='wrongSignUp'>
                            <img style={{ height: "20px" }} src={Warning} alt="" />
                            <p style={{ marginLeft: "7px" }}>User name or email existing</p>
                        </div> */}
                        <div className='buttonLayout'>
                            <button type='submit' className='submitButton'>Sign Up</button>
                        </div>
                    </form>
                    <div className='haveAccount' style={{marginTop:"10px"}}>
                        <p>Have an account?</p>
                        <Link to={"/login"} href="">Login</Link>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default SignUp;


