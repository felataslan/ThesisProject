import React, { useEffect } from 'react'
import { useState } from 'react'
import MenuEditor from '../components/menuEditor'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap'
import '../style/users.scss'
import axios from 'axios'

const EditorUsers = () => {
    const [users, setUsers] = useState([]);
    const [isEditor, setIsEditor] = useState(false)
    const [isOwner, setIsOwner] = useState(false)

    useEffect(() => {

        axios.post('http://localhost:3100/editor/user-all', {
            email: JSON.parse(localStorage.getItem('authEditor')).editor.email,
        },
            {
                headers: {
                    authorization: localStorage.getItem('tokenEditor')
                }
            }
        ).then((result) => {
            console.log(result)
            result.data.isEditor ? setIsEditor(true) : setIsEditor(false)
            const userList = []
            if (isEditor) {
                setIsOwner(true)
                result.data.users.map((item) => {
                    userList.push(item)
                    return userList;
                })
                setUsers(userList);
            }
        })

    }, [isEditor])

    const asyncHandleSubmit = async (user) => {
        let alertMessage = '';
        console.log(user)
        await axios.post('http://localhost:3100/editor/user-delete', {
            userId: user,
        },
            {
                headers: {
                    authorization: localStorage.getItem('tokenEditor')
                }
            }
        ).then((result) => {

            console.log(result.data)
            if (result.data.succeded) {
                alertMessage = result.data.message
            }
            axios.post('http://localhost:3100/admin/user-all', {
                email: JSON.parse(localStorage.getItem('authEditor')).editor.email,
            },
                {
                    headers: {
                        authorization: localStorage.getItem('tokenEditor')
                    }
                }
            ).then((result) => {
                if (result.data.isEditor) {
                    setIsOwner(true)
                    const newUsersData = []
                    result.data.users.map((item) => {
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
                    <MenuEditor isLogin={localStorage.getItem("tokenEditor") ? true : false} />



            

            <div className='container'>

                <div className='row' id='bgusers'>
                    <h1>Kullanıcılar</h1>
                </div>

                <div className='row'>


                    {users && users.length > 0 && users.map((result, index) => {

                        return (
                            <div key={index || {}} className='col-lg-4 col-md-6 col-sm-12 mt-5 '>
                                <Card style={{ width: '18rem', height: '20rem', }}>
                                    <Card.Body>
                                        <Card.Title >{result.name + ' ' + result.surname}</Card.Title>
                                        <Card.Text>Email:  {result.email}</Card.Text>
                                        <Card.Text>Kullanıcı Adı: {result.userName}</Card.Text>
                                        <Card.Text>Cinsiyet: {result.gender}</Card.Text>
                                        <Card.Text>Şehir: {result.city}</Card.Text>

                                        <Button variant='danger' onClick={(e) => asyncHandleSubmit(result._id)} type='submit' style={{ marginTop: '30px', marginLeft: '70px', display: isOwner ? 'inline-block' : 'none' }}>Kullanıcıyı Sil</Button>

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

export default EditorUsers