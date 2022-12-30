import React from 'react'
import { useState } from 'react';
import '../style/menu.scss'
import "bootstrap/dist/css/bootstrap.css";
import 'react-bootstrap'
import SignOut from "../image/signOut.png"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import 'bootstrap'

const MenuEditor = ({ isLogin }, prop) => {

    const [control, setControl] = useState(true);
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem("tokenAdmin")
        localStorage.removeItem('authAdmin')
        navigate("/login-admin")
    }



    return (
        <div className='Menu' style={{ fontSize: '16px' }}>
            <nav className='head bg-danger'>
                <h1 className='Header'>HIRE STUFF Admin Paneli</h1>
                <ul >
                    <li style={{ display: isLogin ? 'none' : 'block' }}>
                        <Link to={'/signup'} className='btn btn-primary  signUpButton  ' >
                            <p className=' buttonTextLayout'>Sign Up</p>
                        </Link>
                    </li>
                    <li >

                        <Link to={isLogin ? '/profile' : '/login'} style={{ display: prop.to === 'login' ? 'none' : 'block' }} className='btn btn-success loginButton '>

                            <p className='buttonTextLayout'>{
                                isLogin ? JSON.parse(localStorage.getItem("authAdmin")).admin.name :
                                    "Login"}</p>

                        </Link>
                    </li>

                    <li>
                        <div onClick={() => setControl(!control)} className='UserIcon'>
                            {!isLogin ?
                                <div>
                                    <div style={{
                                        display: control ? "none" : "flex", top: "45px", zIndex: "2", height: "50px", width: "300px",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "#E491924D",
                                        marginTop: "10px"
                                    }} className='openMenuLognot' >
                                        <div className='profileContainer' onClick={() => navigate("/login-admin")} style={{
                                            width: "80%", height: "30px", backgroundColor: "#F5F5F5CC", marginBottom: "10px", display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "10px"
                                        }}>
                                            <Link className='menuLinkContain' to={"/login-admin"} style={{
                                                fontFamily: 'Inter',
                                                fontStyle: "normal",
                                                fontWeight: "700",
                                                fontSize: "13px",
                                                lineHeight: "21px",
                                                textAlign: "center",
                                                color: "#000000",
                                            }}>Admin Girişi</Link>
                                        </div>
                                        <div className='profileContainer' onClick={() => navigate("/login-editor")} style={{
                                            width: "80%", height: "30px", backgroundColor: "#F5F5F5CC", marginBottom: "10px", display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "10px"
                                        }}>
                                            <Link className='menuLinkContain' to={"/login-editor"} style={{
                                                fontFamily: 'Inter',
                                                fontStyle: "normal",
                                                fontWeight: "700",
                                                fontSize: "13px",
                                                lineHeight: "21px",
                                                textAlign: "center",
                                                color: "#000000",
                                            }}>Editor Girişi</Link>
                                        </div>

                                    </div>
                                </div> :
                                <div onClick={() => setControl(!control)} className='UserIcon'>
                                    <div style={{
                                        display: control ? "none" : "flex", top: "45px", zIndex: "2", height: "150px", width: "300px",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "#E491924D",
                                        marginTop: "10px"
                                    }} className='openMenuLogIn' >
                                         <div className='profileContainer' onClick={() => navigate("/add-editor")} style={{
                                            width: "80%", height: "30px", backgroundColor: "#F5F5F5CC", marginBottom: "10px", display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "10px"
                                        }}>
                                            <Link className='menuLinkContain' to={"/add-editor"} style={{
                                                fontFamily: 'Inter',
                                                fontStyle: "normal",
                                                fontWeight: "700",
                                                fontSize: "13px",
                                                lineHeight: "21px",
                                                textAlign: "center",
                                                color: "#000000",
                                            }}>Editör Ekle</Link>
                                        </div>
                                        <div className='logOutContainer' onClick={logOut} style={{
                                            width: "80%", height: "30px", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "#F5F5F5CC",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "10px"
                                        }}>
                                            <Link className='menuLinkContain' to={"/admin"} style={{
                                                marginLeft: "5px",
                                                fontFamily: 'Inter',
                                                fontStyle: "normal",
                                                fontWeight: "700",
                                                fontSize: "13px",
                                                lineHeight: "21px",
                                                textAlign: "center",
                                                color: "#000000",

                                            }}>Sign Out</Link>
                                            <img style={{ width: "15px", height: "15px", marginLeft: "10px" }} src={SignOut} alt="" />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </li>

                </ul>

                {isLogin ?
                    <div className='navbar ' >

                        <ul>
                            <li className='nav-item '><Link to={'/editors'}>Editorler</Link></li>
                            <li className='nav-item '><Link to={'/products'}>Ürünler</Link></li>
                            <li className='nav-item '><Link to={'/users'}>Kullanıcılar</Link></li>



                        </ul>
                    </div>
                    :
                    <div className='navbar ' >

                        <ul>
                            <li className='nav-item '><Link to={'/'}>Anasayfa</Link></li>
                            <li className='nav-item '><Link to={'/jewelry'}>Takılar</Link></li>
                            <li className='nav-item '><Link to={'/furniture'}>Ev Eşyaları</Link></li>
                            <li className='nav-item '><Link to={'/tecnology'}>Teknolojik Aletler</Link></li>

                        </ul>
                    </div>
                }

            </nav>



        </div>
    )
}

export default MenuEditor