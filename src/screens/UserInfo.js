import React from 'react';
import "../style/UserInfo.scss";
import eyeIcon from "../image/eye.png"
import 'react-bootstrap'
// import Warning from "../image/warning.png"
import { useState } from 'react';
import Menu from '../components/Menu';
import Footer from '../components/Footer'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserInfo = () => {
    const navigate = useNavigate();
    const [controlVisible, setControlVisible] = useState(true);
    const [controlVisibleNewPass, setControlVisibleNewPass] = useState(true);
    const [controlVisibleConfirm, setControlVisibleConfirm] = useState(true);

    // const [control, setControl] = useState(true);
    // const [vectorControl, setvectorControl] = useState(false);
    const [nameUpdate, setnameUpdate] = useState(
        localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth')).user.name
            : null);
    const [surNameUpdate, setsurnameUpdate] = useState(
        localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth')).user.surname
            : null);
    const [userNameUpdate, setuserNameUpdate] = useState(
        localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth')).user.userName
            : null
    );
    const [emailUpdate, setemailUpdate] = useState(
        localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth')).user.email
            : null
    );
    const [genderUpdate, setgenderUpdate] = useState(
        localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth')).user.gender
            : null
    );
    const [cityUpdate, setcityUpdate] = useState(
        localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth')).user.city
            : null
    );
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [islogin, setIsLogin] = useState(false);

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
        console.log(password);
        if (e.target.value === "") {
            e.target.setCustomValidity("Please fill in the marked fields");
        } else if (password === newPassword) {
            e.target.setCustomValidity("");
        }
        return true;
    }
    function InvalidMsgConfirmPassword(e) {
        console.log("password confrim passwrod");
        console.log(password);
        console.log(newPassword);
        console.log(nameUpdate);
        if (e.target.value === "") {
            e.target.setCustomValidity("Please fill in the marked fields");
        } else if (password === newPassword) {
            e.target.setCustomValidity(
                "Your new password cannot be the same as your old password."
            );
        } else {
            e.target.setCustomValidity("");
        }
        if (newPassword !== confirmPassword) {
            e.target.setCustomValidity('Passwords do not match.');
        }
        else {
            e.target.setCustomValidity('');
        }
        return true;
    }
    function InvalidMsgConfirmPassword1(e) {
        console.log("password confrim passwrod")
        console.log(password)
        console.log(newPassword)
        if (confirmPassword !== newPassword) {
            e.target.setCustomValidity('Passwords do not match.');
        }
        else {
            e.target.setCustomValidity('');
        }
        return true;
    }
    const handleSubmit = async (e) => {
        console.log(nameUpdate);
        console.log(surNameUpdate);
        console.log(userNameUpdate);
        console.log(emailUpdate);
        console.log(genderUpdate);
        console.log(cityUpdate);
        e.preventDefault();
        let alertMessage = '';

        // let token = document.cookie
        // console.log('token:',JSON.stringify(token));
        if (
            JSON.parse(localStorage.getItem("auth")).user.name !== nameUpdate ||
            JSON.parse(localStorage.getItem("auth")).user.surname !== surNameUpdate ||
            JSON.parse(localStorage.getItem("auth")).user.userName !== userNameUpdate ||
            JSON.parse(localStorage.getItem("auth")).user.email !== emailUpdate ||
            JSON.parse(localStorage.getItem("auth")).user.gender !== genderUpdate ||
            JSON.parse(localStorage.getItem("auth")).user.city !== cityUpdate
        ) {
            await axios.post('http://localhost:3100/users/userinfo', {
                name: nameUpdate,
                surname: surNameUpdate,
                userName: userNameUpdate,
                email: emailUpdate,
                gender: genderUpdate,
                city: cityUpdate,
            },
                {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                }




            ).then((result) => {

                if (result.data.token) {
                    localStorage.removeItem('token');
                    localStorage.setItem('token', result.data.token);
                    localStorage.removeItem('auth');
                    let object = {
                        user: {
                            name: nameUpdate,
                            surname: surNameUpdate,
                            userName: userNameUpdate,
                            email: emailUpdate,
                            gender: genderUpdate,
                            city: cityUpdate
                        }

                    }
                    localStorage.setItem('auth', JSON.stringify(object));

                }

                console.log(result);
                if (result.status) {
                    alertMessage += 'User informations succesfully updated';
                    navigate('/userinfo')

                }
            })
                .catch((result) => {
                    alertMessage += 'user informations not updated'
                    console.log(result);
                    setIsLogin(true)
                    console.log(islogin)
                })

        }
        console.log(userNameUpdate)
        alert(alertMessage);
    }
    const handleSubmitPass = async (e) => {
        let alertMessage = '';
        if (document.getElementById('exampleInputNewPassword').value.length >= 8) {
            console.log('Log 1')
            if (localStorage.getItem('token')) {
                console.log('Log 2')
                await axios.put('http://localhost:3100/users/passwordUpdate',
                    {
                        email: emailUpdate,
                        oldPassword: password,
                        newPassword: newPassword,

                    },
                    {
                        headers: {
                            authorization: localStorage.getItem('token'),
                        },
                    },

                ).then((result) => {
                    console.log('Log 3')
                    if (result.status) {
                        console.log('Log 4')
                        console.log(result.status);
                        alertMessage += 'Password updated succesfully';
                        navigate('/userInfo');
                    }
                })
                    .catch((result) => {
                        console.log('Log 5')
                        console.log('Result:', result)
                        alertMessage = 'Password update not succesfully';
                        setIsLogin(true);
                    })

                alert(alertMessage);
            }

        }


    }

    return (

        <div className='App'>
            <Menu isLogin={localStorage.getItem("token") ? true : false} />
            <div className='Pass'>
                <h3>
                    Şifre Güncelleme
                </h3>
                <form onSubmit={handleSubmitPass}>
                    <div className="form-group">
                        <label htmlFor="exampleInputOldPassword">Old Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            onInput={JSON.parse(localStorage.getItem("auth")).user.email !== emailUpdate ? null : InvalidMsgPassword}
                            onInvalidCapture={InvalidMsgPassword}
                            value={password}
                            type={controlVisible ? "password" : "text"}
                            className="form-control"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            id="exampleInputOldPassword"
                            placeholder="Enter your password"
                        />
                        <div
                            className="eyeIcon"
                            style={{ left: "90%", position: "relative", top: "-25px" }}
                            type="button"
                            onClick={() => setControlVisible(!controlVisible)}
                        >
                            <img src={eyeIcon} alt="" />
                        </div>
                    </div>
                    <div className="form-group"
                        style={{ position: "relative", top: "-20px" }}
                    >
                        <label htmlFor="exampleInputNewPassword">New Password</label>
                        <input
                            value={newPassword}
                            onInput={
                                JSON.parse(localStorage.getItem("auth")).user.emailUpdate !== emailUpdate ? null : InvalidMsgConfirmPassword
                            }
                            onInvalidCapture={InvalidMsgConfirmPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type={controlVisibleNewPass ? "password" : "text"}
                            className="form-control"
                            id="exampleInputNewPassword"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            placeholder="Enter your new password"
                        />
                        <div
                            className="eyeIcon"
                            style={{ left: "90%", position: "relative", top: "-25px" }}
                            type="button"
                            onClick={() => setControlVisibleNewPass(!controlVisibleNewPass)}
                        >
                            <img src={eyeIcon} alt="" />
                        </div>
                    </div>
                    <div className="form-group"
                        style={{ position: "relative", top: "-40px" }}
                    >
                        <label htmlFor="exampleInputConfirmPassword">Confirm Password</label>
                        <input
                            value={confirmPassword}
                            onInput={InvalidMsgConfirmPassword1}
                            onInvalidCapture={InvalidMsgConfirmPassword1}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type={controlVisibleConfirm ? "password" : "text"}
                            className="form-control"
                            id="exampleInputConfirmPassword"

                            placeholder="Confirm your password"
                        />
                        <div
                            className="eyeIcon"
                            style={{ left: "90%", position: "relative", top: "-25px" }}
                            type="button"
                            onClick={() => setControlVisibleConfirm(!controlVisibleConfirm)}
                        >
                            <img src={eyeIcon} alt="" />
                        </div>
                    </div>

                    <div style={{ marginTop: '-10px', }} className='buttonLayout'>
                        <button type='submit' className='submitButton'>Şifreyi Güncelle</button>
                    </div>
                </form>

            </div>





            <div className='Edit bg-danger ' id='edit'>

                <h3>Kişisel Bilgiler</h3>



                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputName">Ad</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <input
                                onInput={(e) => e.target.setCustomValidity("")}
                                onInvalidCapture={(e) => e.target.setCustomValidity("Lütfen adınızı giriniz.")}
                                value={nameUpdate} onChange={(e) => setnameUpdate(e.target.value)}
                                required type="text" className="form-control" id="exampleInputName"
                                aria-describedby="nameUpdateHelp" placeholder="Lütfen Adınızı giriniz" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputSurname">Soyad</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <input onInput={(e) => e.target.setCustomValidity("")}
                                onInvalidCapture={(e) => e.target.setCustomValidity("Lütfen soyadınızı giriniz.")}
                                value={surNameUpdate} onChange={(e) => setsurnameUpdate(e.target.value)} required type="text"
                                className="form-control" id="exampleInputSurname" aria-describedby="surNameUpdateHelp" placeholder="Lütfen Soyadınızı giriniz" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputUserName1">Username</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <input onInput={(e) => e.target.setCustomValidity("")}
                                onInvalidCapture={(e) => e.target.setCustomValidity("Lütfen kullanıcı adınızı giriniz")}
                                value={userNameUpdate} onChange={(e) => setuserNameUpdate(e.target.value)}
                                required type="name" className="form-control" id="exampleInputUserName1"
                                aria-describedby="userNameUpdateHelp" placeholder="Lütfen kullanıcı adınızı giriniz." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <input
                                onInput={InvalidMsg} onInvalidCapture={InvalidMsg}
                                value={emailUpdate} onChange={(e) => setemailUpdate(e.target.value)}
                                required type="email" className="form-control" id="exampleInputEmail1"
                                aria-describedby="emailHelp" placeholder="Lütfen E-mail adresinizi giriniz" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sel1">Choose Gender</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <select
                                onInput={(e) => e.target.setCustomValidity("")}
                                onInvalidCapture={(e) => e.target.setCustomValidity("Lütfen cinsiyetinizi seçiniz")}
                                value={genderUpdate} onChange={(e) => setgenderUpdate(e.target.value)}
                                required className="form-control" id="sel1" name='sellist' >
                                <option placeholder='Lütfen cinsiyetinizi seçiniz'></option>
                                <option>Kadın</option>
                                <option>Erkek</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sel2">Select City</label>
                            <span style={{ color: "white", marginLeft: "3px" }} className='form-required'>*</span>
                            <select
                                onInput={(e) => e.target.setCustomValidity("")} onInvalidCapture={(e) => e.target.setCustomValidity("Please Choose city")}
                                value={cityUpdate} onChange={(e) => setcityUpdate(e.target.value)}
                                required className="form-control" id="sel2">
                                <option></option>
                                <option>İstanbul</option>
                                <option>İzmir</option>
                                <option>Ankara</option>
                                <option>Kocaeli</option>
                                <option>Antalya</option>

                            </select>
                        </div>

                        {/* <div style={{ display: islogin ? 'flex' : 'none' }} className='wrongSignUp'>
                            <img style={{ height: "20px" }} src={Warning} alt="" />
                            <p style={{ marginLeft: "7px" }}>User name or email existing</p>
                        </div> */}
                        <div style={{ paddingTop: '30px', }} className='buttonLayout'>
                            <button className='submitButton'>Güncelle</button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default UserInfo;


