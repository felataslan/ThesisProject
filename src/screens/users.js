import React, { useEffect } from 'react'
import { useState } from 'react'
import MenuAdmin from '../components/menuAdmin'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import { useNavigate } from "react-router-dom";
import 'bootstrap'
import '../style/users.scss'
import axios from 'axios'


const Users = () => {
    const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false)
    const [isOwner, setIsOwner] = useState(false)

    useEffect(() => {
        
        axios.post('http://localhost:3100/admin/user-all', {
            email: JSON.parse(localStorage.getItem('authAdmin')).admin.email,
        },
            {
                headers: {
                    authorization: localStorage.getItem('tokenAdmin')
                }
            }
        ).then((result) => {
            console.log(result)
            result.data.isAdmin ? setIsAdmin(true) : setIsAdmin(false)
            const userList = []
            if (isAdmin) {
                setIsOwner(true)
                result.data.users.map((item) => {
                    userList.push(item)
                    return userList;
                })
                setUsers(userList);
            }
        })

    } , [isAdmin])

    const asyncHandleSubmit = async (user) => {
        let alertMessage = '';
        console.log(user)
        await axios.post('http://localhost:3100/admin/user-delete', {
            userId: user,
        },
            {
                headers: {
                    authorization: localStorage.getItem('tokenAdmin')
                }
            }
        ).then((result) => {

            console.log(result.data)
            if (result.data.succeded) {
                alertMessage = result.data.message
            }
            axios.post('http://localhost:3100/admin/user-all', {
                email: JSON.parse(localStorage.getItem('authAdmin')).admin.email,
            },
                {
                    headers: {
                        authorization: localStorage.getItem('tokenAdmin')
                    }
                }
            ).then((result) => {
                if(result.data.isAdmin){
                    setIsOwner(true)
                    const newUsersData=[]
                    result.data.users.map((item)=>{
                        newUsersData.push(item)
                        return newUsersData;
                    })
                    setUsers(newUsersData)
                }
            })


        })
     alert(alertMessage)

    }


    return (
        <div>
            
                    <MenuAdmin isLogin={localStorage.getItem("tokenAdmin") ? true : false} />
                    

           
            <div className='container'>

                <div className='row' id='bgusers'>
                    <h1>Kullanıcılar</h1>
                </div>

                <div className='row'>


                    {users && users.length > 0 && users.map((result, index) => {

                        return (
                            <div key={index || {}} className='col-lg-4 col-md-6 col-sm-12 mt-5 '>
                                <Card  style={{ width: '18rem', height: '20rem', }}>
                                    <Card.Body>
                                        <Card.Title >{result.name + ' ' + result.surname}</Card.Title>
                                        <Card.Text>Email:  {result.email}</Card.Text>
                                        <Card.Text>Kullanıcı Adı: {result.userName}</Card.Text>
                                        <Card.Text>Cinsiyet: {result.gender}</Card.Text>
                                        <Card.Text>Şehir: {result.city}</Card.Text>

                                        <Button variant='danger' onClick={(e)=>asyncHandleSubmit(result._id)} type='submit' style={{ marginTop: '30px', marginLeft: '70px', display: isOwner ? 'inline-block' : 'none' }}>Kullanıcıyı Sil</Button>

                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Users